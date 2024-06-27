import { Request, Response } from "express";
import { getAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";
import IAppointment from "../interfaces/IAppointment";

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments: Appointment[] = await getAppointmentsService();
        if (appointments.length > 0) {
        	res.status(200).json(appointments)
        } else {
        	res.status(404).json({ error: "No se han encontrado turnos." })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    const appointmentId: number = parseInt(req.params.id);
    try {
        const foundAppointment: Appointment | null = await getAppointmentByIdService(appointmentId);
        if (foundAppointment) {
        	res.status(200).json(foundAppointment)
        } else {
        	res.status(404).json({ error: "Turno no encontrado." })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor." })
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    const { date, time, userId } = req.body;
    try {
        const newAppointment: Appointment = await createAppointmentService({ date, time, userId });
        res.status(201).json(newAppointment)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el turno." });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
	const appointmentId: number = parseInt(req.params.id);
    try {
        await cancelAppointmentService(appointmentId);
        res.status(200).json("Turno cancelado correctamente.")
    } catch (error) {
        res.status(404).json({ error: "Turno no encontrado." })
    }
};