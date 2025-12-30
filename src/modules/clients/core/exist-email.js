import { error } from '#helpers';
import ClientRepository from '#repository/client';
import { APP_MESSAGES } from '#constants';

export const existEmailInClient = async email => {
    const existingClient = await ClientRepository.findOneByEmail(email);
    if (existingClient) throw error(APP_MESSAGES.ERROR.EMAIL_IN_USE(email));
    return
}