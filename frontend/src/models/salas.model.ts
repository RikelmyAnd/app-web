import {z} from 'zod';

export interface ISala {
    id: string;
    nome: string;
    numero: number;
    capacidade: number;
    tipo: '2D' | '3D' | 'IMAX';
    assento: number[][];
}

export const salaSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(1, 'O nome da sala é obrigatório'),
    numero: z.number().min(1, 'O número da sala deve ser maior que 0'),
    capacidade: z.number().min(1, 'A capacidade da sala deve ser maior que 0'),
    tipo: z.enum(['2D', '3D', 'IMAX']),
    assento: z.array(z.array(z.union([z.literal(0), z.literal(1)])))
});