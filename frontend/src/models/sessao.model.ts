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
    dataHora: z.string().min(1, "Data e hora são obrigatórias")
        .refine((val) => {
            const dataSessao = new Date(val);
            const agora = new Date();
            return dataSessao > agora;
        }, {
            message: "A sessão não pode ser criada no passado"
        }),
    filmeId: z.string().min(1, "Selecione um filme"),
    salaId: z.string().min(1, "Selecione uma sala"),
    valorIngresso: z.number().min(0).optional()
});