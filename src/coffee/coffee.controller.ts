import { Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService){}
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        return  this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return  this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return  this.coffeeService.remove(id);
    }
}