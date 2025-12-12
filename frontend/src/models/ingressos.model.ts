import {z} from 'zod';

export interface IIngresso {
    id: string;
    valorInteira: number;
    valorMeia: number;
    sessaoId: string;
}

export const ingressoSchema = z.object({
    id: z.string().uuid(),
    valorInteira: z.number().min(0, 'O valor do ingresso deve ser maior ou igual a 0'),
    valorMeia: z.number().min(0, 'O valor do ingresso deve ser maior ou igual a 0'),
    sessaoId: z.string().uuid()
});
