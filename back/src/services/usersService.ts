import { AppDataSource, UserModel, CredentialModel } from "../config/data-source";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import UserDto from "../dto/UserDto";
import CredentialDto from "../dto/CredentialDto";
import { createCredentialService, validateCredentialService } from "./credentialsService";

export const getUsersService = async (): Promise<User[]> => {
    const users: User[] = await UserModel.find();
    return users;
};

export const getUserByIdService = async (userId: number): Promise<User | null> => {
    const foundUser: User | null = await UserModel.findOne({
        where: {
            id: userId
        },
        relations: {
            appointments: true,
        },
    });
    return foundUser
};

export const createUserService = async (userData: UserDto): Promise<User> => {
    const newCredentialId: number = await createCredentialService({
        username: userData.username,
        password: userData.password
    });

    const newCredential = await CredentialModel.findOneBy({ id: newCredentialId });

    const newUser: Omit<User, "id" | "appointments"> = {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId: newCredential!,
    }
    const createdUser: User = await UserModel.create(newUser);
    await UserModel.save(createdUser);
    return createdUser
};

export const loginUserService = async (credentialData: CredentialDto): Promise<User | null > => {
    const validatedCredentialId: number = await validateCredentialService(credentialData);
    if (validatedCredentialId === -1) {
        return null;
    }

    const validatedCredential: Credential | null = await CredentialModel.findOneBy({ id: validatedCredentialId });
    if (!validatedCredential) {
        return null; // Esto no deberia de pasar si validatedCredentialId existe (es !== -1)
    }

    const validatedUser: User | null = await UserModel.findOne({ where: { credentialsId: validatedCredential },});
    return validatedUser;
};



