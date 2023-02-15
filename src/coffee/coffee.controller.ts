import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService){}
    @Get()
    findAll(){
        return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
        return true;
    }
}