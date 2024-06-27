import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn({
        name: "appo_id"
    })
    id: number

    @Column({
        name: "appo_date",
        type: "date"
    })
    date: string

    @Column({
        name: "appo_time",
        type: "time",
        precision: 0
    })
    time: string

    @Column({
        name: "appo_status",
        length: 15
    })
    status: string
    
    @ManyToOne(() => User, (user) => user.appointments)
    userId: User
};