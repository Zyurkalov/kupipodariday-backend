import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import IdAndDate from "../interface/idAndDate";
import { IsDate, IsNumber } from "class-validator";

@Entity()
export class BaseEntityForIdAndDate extends BaseEntity {

    @ApiProperty({
        description: 'уникальный идентификатор'
    })
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: IdAndDate['id'];


    @ApiProperty({
        description: 'дата создания'
    })
    @CreateDateColumn()
    @IsDate()
    createdAt: IdAndDate['date'];

    
    @ApiProperty({
        description: 'дата изменения'
    })
    @UpdateDateColumn()
    @IsDate()
    updatedAt: IdAndDate['date'];
}