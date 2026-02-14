import { CreateCourierSchema } from './create-courier.js';

export const UpdateCourierSchema = CreateCourierSchema.omit({ password: true });