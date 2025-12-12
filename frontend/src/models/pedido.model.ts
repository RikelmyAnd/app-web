import {z} from 'zod';

export interface IPedido  {
    id: string;
    qtdIngressos: number;
    qtdMeia: number;
    ingressoId: string[];
    lancheId?: string[];
    valorTotal: number;
}

export const pedidoSchema = z.object({
    id: z.string().uuid(),
    qtdIngressos: z.number().min(1, 'A quantidade de ingressos deve ser maior que 0'),
    qtdMeia: z.number().min(0, 'A quantidade de meia-entrada não pode ser negativa'),
    ingressoId: z.array(z.string().uuid()),
    lancheId: z.array(z.string().uuid()).optional(),
    valorTotal: z.number().min(0, 'O valor total deve ser maior ou igual a 0'),
});