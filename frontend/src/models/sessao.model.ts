import {z} from 'zod';

export interface ISessao {
    id: string;
    horario: string;
    filmeId: string;
    salaId: string[];
}

export const sessaoSchema = z.object({
    id: z.string().uuid(),
    horario: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Horário inválido'
    }),
    filmeId: z.string().uuid(),
    salaId: z.string().uuid()
});