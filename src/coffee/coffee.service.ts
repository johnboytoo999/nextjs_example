import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Connection, DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entites/event.entity';

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly FlavorRepository: Repository<Flavor>,
        private readonly connection: DataSource,
    ){}

    findAll(paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: number){
        const coffee = await this.coffeeRepository.findOne({where:{id:Number(id)},relations:['flavors']});
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto ){
        const flavors = await Promise.all(
          createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),  
        );
        const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors});
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: any){
        const flavors = updateCoffeeDto.flavors && 
        (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),  
        ));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        })

        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){
        const coffee = await this.coffeeRepository.findOneBy({id:+id});
        return this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee: Coffee){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            coffee.recommendations++;
            
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch(err){
            await queryRunner.rollbackTransaction();
        }
        finally{
            await queryRunner.release();
        }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor>{
        const existingFlavor = await this.FlavorRepository.findOne({where:{name:String(name)}})
        if(existingFlavor){
            return existingFlavor;
        }   
        return this.FlavorRepository.create({name});
    }
}
