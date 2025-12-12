import {z} from 'zod';

export interface ILancheCombo {
    id: string;
    nome: string;
    descricao: string;
    precounidade: number;
    quantidade: number;
    valortotal: number;
}

export const lancheComboSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(1, 'O nome do lanche/combo é obrigatório'),
    descricao: z.string().min(1, 'A descrição do lanche/combo é obrigatória'),
    precounidade: z.number().min(0, 'O preço por unidade deve ser maior ou igual a 0'),
    quantidade: z.number().min(1, 'A quantidade deve ser maior que 0'),
    valortotal: z.number().min(0, 'O valor total deve ser maior ou igual a 0'),
});