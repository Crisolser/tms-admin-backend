import { error } from '#helpers';
import AdminRepository from '#repository/admin';
import { APP_MESSAGES } from '#constants';

export const existEmailInAdmin = async email => {
    const existingAdmin = await AdminRepository.findOneByEmail(email);
    if (existingAdmin) throw error(APP_MESSAGES.ERROR.EMAIL_IN_USE(email));
    return
}