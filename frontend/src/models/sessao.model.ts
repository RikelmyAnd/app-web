import {z} from 'zod';

export interface ISessao {
    id: string;
    dataHora: string;
    filmeId: string;
    salaId: string;
    valorIngresso?: number;
}

export const sessaoSchema = z.object({
    id: z.string(),
    dataHora: z.string(),
    filmeId: z.string().uuid().or(z.literal('')),
    salaId: z.string().uuid().or(z.literal('')),
    valorIngresso: z.number().min(0).optional()
});