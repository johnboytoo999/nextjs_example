import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
    // constructor(
    //     @InjectRepository(Coffee)
    //     private readonly coffeeRepository: Repository<Coffee>,
    // ){}

    findAll(){
        // return this.coffeeRepository.find();
        return 'find all';
    }

    async findOne(id: number){
        // const coffee = await this.findOne(id);
        // if(!coffee){
        //     throw new NotFoundException(`Coffee #${id} not found`);
        // }
        // return coffee;
        return 'find one'
    }

    // create(createCoffeeDto: any ){
    //     const coffee = this.coffeeRepository.create(createCoffeeDto);
    //     return this.coffeeRepository.save(coffee);
    // }

    // async update(id: number, updateCoffeeDto: any){
    //     const coffee = await this.coffeeRepository.preload({
    //         id: +id,
    //         ...updateCoffeeDto,
    //     })

    //     if(!coffee){
    //         throw new NotFoundException(`Coffee #${id} not found`);
    //     }

    //     return this.coffeeRepository.save(coffee);
    // }

    // async remove(id: number){
    //     const coffee = await this.findOne(id);
    //     return this.coffeeRepository.remove(coffee);
    // }
}
