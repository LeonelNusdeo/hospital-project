import { Request, Response, NextFunction } from "express";

export const validateAppointmentData = (req: Request, res: Response, next: NextFunction) => {
    const { date, time, userId } = req.body;

    if (!date || !time || !userId) {
        return res.status(400).json({ error: `Faltan campos obligatorios.` });
    }

    const appointmentDate = new Date(date);
    const currentDate = new Date();
    if (!isValidDate(date) || appointmentDate <= currentDate || !isWeekday(appointmentDate)) {
        return res.status(400).json({ error: `Formato del campo 'date' invalido o no es un proximo dia laborable. Debe ser AAAA-MM-DD.` });
    }

    if (!isValidTime(time)) {
        return res.status(400).json({ error: `Formato del campo 'time' invalido. Debe ser HH:MM.` });
    }

    const appointmentTime = new Date(`2000-01-01T${time}`);
    const appointmentHour = appointmentTime.getHours();
    if (appointmentHour < 9 || appointmentHour >= 18) {
        return res.status(400).json({ error: `El campo 'time' no se encuentra dentro del horario laboral. Debe ser de 09 a 18 horas.` });
    }

    next();
};

const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};

const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 5 && day !== 6; // 5 es Sabado, 6 es Domingo
};

const isValidTime = (timeString: string): boolean => {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(timeString);
};