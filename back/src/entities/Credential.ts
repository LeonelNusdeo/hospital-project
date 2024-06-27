import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name: "credentials"
})
export class Credential {
    @PrimaryGeneratedColumn({
        name: "cred_id"
    })
    id: number

    @Column({
        name: "cred_username",
        length: 100
    })
    username: string

    @Column({
        name: "cred_password",
        length: 100
    })
    password: string
};