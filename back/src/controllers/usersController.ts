import { Request, Response } from "express";
import { getUsersService, getUserByIdService, createUserService, loginUserService } from "../services/usersService";
import { User } from "../entities/User";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUsersService();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
    	const userId: number = parseInt(req.params.id);
        const foundUser: User | null = await getUserByIdService(userId);
        if (foundUser) {
            res.status(200).json(foundUser)
        } else {
            res.status(404).json({ error: "Usuario no encontrado." })
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor." })
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
    	const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser: User = await createUserService({ name, email, birthdate, nDni, username, password });
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const validatedUser: User | null = await loginUserService({ username, password });
		if (validatedUser) {
			res.status(200).json({ login: true, user: validatedUser }) 
		} else {
			res.status(400).json({ error: "Datos de usuario incorrectos." })
		}
	} catch (error) {
		res.status(500).json({ error: "Error interno del servidor." });
	}
};