import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'local', 'test'])
        .default('local'),
    PORT: z.coerce
        .number('El puerto debe ser un número')
        .transform(val => (val == '' ? undefined : val))
        .default(5001),
    DB_HOST: z
        .string({
        error: issue => (issue.input === undefined ? 'El host de la base de datos es obligatorio' : 'El host de la base de datos debe ser una cadena'),
        })
        .min(1, 'El host de la base de datos no puede estar vacío'),
    DATABASE: z
        .string({
        error: issue =>
            issue.input === undefined ? 'El nombre de la base de datos es obligatorio' : 'El nombre de la base de datos debe ser una cadena',
        })
        .min(1, 'El nombre de la base de datos no puede estar vacío'),
    DB_PORT: z.coerce
        .number({
        error: issue =>
            issue.input === undefined ? 'El puerto de la base de datos es obligatorio' : 'El puerto de la base de datos debe ser un número',
        })
        .min(1, 'El puerto de la base de datos no puede estar vacío'),
    DB_USER: z
        .string({
        error: issue =>
            issue.input === undefined ? 'El usuario de la base de datos es obligatorio' : 'El usuario de la base de datos debe ser una cadena',
        })
        .min(1, 'El usuario de la base de datos no puede estar vacío'),
    DB_PASSWORD: z
        .string({
        error: issue =>
            issue.input === undefined ? 'La contraseña de la base de datos es obligatoria' : 'La contraseña de la base de datos debe ser una cadena',
        })
        .min(1, 'La contraseña de la base de datos no puede estar vacía'),
    AUTH_ACCESS_TOKEN_EXPIRATION: z
        .string()
        .regex(/^\d+[smhd]$/, {
        message: 'Debe ser un número seguido de [s:segundos, m:minutos, h:horas, d:días] (ej: 10m, 3s, 1h, 2d)',
        })
        .default('10m'),
    AUTH_REFRESH_TOKEN_EXPIRATION: z
        .string()
        .regex(/^\d+[smhd]$/, {
        message: 'Debe ser un número seguido de [s:segundos, m:minutos, h:horas, d:días] (ej: 10m, 3s, 1h, 2d)',
        })
        .default('3d'),
    SECRET_JWT: z
        .string()
        .default('TRACKERGUY#12345'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errors = parsedEnv.error.issues.map(err => `[ENV-ERROR] - ${err.path[0]}: ${err.message}`).join('\n');
  console.error('❌ Error en las variables de entorno:\n' + errors);
  process.exit(1);
}
console.log('✅ Variables de entorno cargadas correctamente');

const env = parsedEnv.data;

export default env;