import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({
	name: "users"
})
export class User {
	@PrimaryGeneratedColumn({
		name: "user_id"
	})
	id: number

	@Column({
		name: "user_name",
		length: 100
	})
	name: string

	@Column({
		name: "user_email",
		length: 100
	})
	email: string

	@Column({
		name: "user_birthdate",
		type: "date"
	})
	birthdate: Date

	@Column({
		name: "user_ndni",
		type: "integer"
	})
	nDni: number

	@OneToOne(() => Credential)
	@JoinColumn({
		name: "user_credentials_id"
	})
	credentialsId: Credential

	@OneToMany(() => Appointment, (appointment) => appointment.userId)
    appointments: Appointment[]
};