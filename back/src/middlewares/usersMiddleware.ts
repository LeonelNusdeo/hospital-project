import { Request, Response, NextFunction } from "express";

export const validateUserRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, username, password } = req.body;

    if (!name || !email || !birthdate || !nDni || !username || !password) {
        return res.status(400).json({ error: `Faltan campos obligatorios.` });
    }

    if (!isValidDate(birthdate)) {
        return res.status(400).json({ error: `Formato del campo "birthdate" invalido. Debe ser AAAA-MM-DD.` });
    }

    if (isNaN(Number(nDni))) {
        return res.status(400).json({ error: `El campo 'nDni' debe ser un numero.` });
    }

    next();
};

const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};
