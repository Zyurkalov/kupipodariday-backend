import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export default class ExtendBaseEntity extends BaseEntity {
    @ApiProperty({
        description: 'идентификатор'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'дата создания'
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'дата обновления'
    })
    @UpdateDateColumn()
    updatedAt: Date;

}