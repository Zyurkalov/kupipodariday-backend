import { BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';

// @Entity()
export abstract class BaseEntityForIdAndDate extends BaseEntity{

    @ApiProperty({
        description: 'уникальный идентификатор'
    })
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({
        description: 'дата создания'
    })
    @CreateDateColumn()
    createdAt: Date;

    
    @ApiProperty({
        description: 'дата изменения'
    })
    @UpdateDateColumn()
    updatedAt: Date;
}