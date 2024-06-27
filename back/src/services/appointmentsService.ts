import { AppDataSource, AppointmentModel, UserModel } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import AppointmentDto from "../dto/AppointmentDto";


export const getAppointmentsService = async (): Promise<Appointment[]> => {
	const appointments: Appointment[] = await AppointmentModel.find();
    return appointments;
};

export const getAppointmentByIdService = async (appointmentId: number): Promise<Appointment | null> => {
    const foundAppointment: Appointment | null = await AppointmentModel.findOneBy({ id: appointmentId });
    return foundAppointment
};

export const createAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment> => {
    const appointmentUser = await UserModel.findOneBy({ id: appointmentData.userId });

    if(appointmentUser) {
	    const newAppointment: Omit<Appointment, "id"> = {
	        date: appointmentData.date,
	        time: appointmentData.time,
	        userId: appointmentUser,
	        status: "active"
	    };

	    const createdAppointment: Appointment = await AppointmentModel.create(newAppointment);
	    await AppointmentModel.save(createdAppointment);
	    return createdAppointment
    } else {
    	throw Error ('Usuario inexistente.');
    }
};

export const cancelAppointmentService = async (appointmentId: number): Promise<void> => {
    const cancelledAppointment: Appointment | null = await AppointmentModel.findOneBy({ id: appointmentId });
    if (cancelledAppointment){
	    cancelledAppointment.status = "cancelled";
	    await AppointmentModel.save(cancelledAppointment);
	} else {
		throw Error ('Turno inexistente.');
	}
};