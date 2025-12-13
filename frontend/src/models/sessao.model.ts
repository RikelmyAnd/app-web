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
    filmeId: z.string().min(1, "Selecione um filme"),
    salaId: z.string().min(1, "Selecione uma sala"),
    valorIngresso: z.number().min(0).optional()
});