import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entites/event.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeeController], 
    providers: [CoffeeService],
    exports:[CoffeeService],
})
export class CoffeeModule {}
