import { AppDataSource, CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import CredentialDto from "../dto/CredentialDto";

export const createCredentialService = async (credentialData: CredentialDto): Promise<number> => {
	const newCredential: Credential = CredentialModel.create(credentialData);
    await CredentialModel.save(newCredential);
    return newCredential.id

};

export const validateCredentialService = async (credentialData: CredentialDto): Promise<number> => {
	const foundCredential: Credential | null = await CredentialModel.findOneBy({ username: credentialData.username });
	if (foundCredential && foundCredential.password === credentialData.password) {
		return foundCredential.id
	} else {
		return -1
	}
};