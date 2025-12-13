import {z} from 'zod';

export interface IFilme {
    id: string;
    titulo: string;
    sinopse: string;
    classificacaoIndicativa: string;
    duracao: number;
    elenco?: string;
    genero: string;
    dataInicialExibicao: string;
    dataFinalExibicao: string;
}

export const filmeSchema = z.object({
    id: z.string(),
    titulo: z.string().min(1, 'O título é obrigatório'),
    sinopse: z.string().min(1, 'A sinopse é obrigatória').min(10, 'A sinopse deve ter no mínimo 10 caracteres'),
    classificacaoIndicativa: z.enum(['Livre', '10', '12', '14', '16', '18']),
    duracao: z.number().min(1, 'A duração deve ser maior que 0'),
    elenco: z.string().optional(),
    genero: z.enum(['Terror', 'Comédia', 'Ação', 'Drama', 'Ficção Científica', 'Romance', 'Animação', 'Documentário']),
    dataInicialExibicao: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Data inicial de exibição inválida'
        }),
    dataFinalExibicao: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Data final de exibição inválida',
    }),}).refine((data) => {
    if (!data.dataInicialExibicao || !data.dataFinalExibicao) return true; 
    const inicio = new Date(data.dataInicialExibicao);
    const fim = new Date(data.dataFinalExibicao);
    return fim >= inicio;
}, {
    message: "A data final não pode ser menor que a data inicial",
    path: ["dataFinalExibicao"], 
});

export const ClassificacaoIndicativa = [
    'Livre',
    '10',
    '12',
    '14',
    '16',
    '18'
];

export const Genero = [
    'Terror',
    'Comédia',
    'Ação',
    'Drama',
    'Ficção Científica',
    'Romance',
    'Animação',
    'Documentário'
];

