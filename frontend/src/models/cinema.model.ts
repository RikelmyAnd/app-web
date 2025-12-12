import {z} from 'zod';

export interface cinema {
    id: string;
    nome: string;
    endereco: string;
    listasalas: string[];
    listafilmes: string[];
    listasessoes: string[];
}

export const cinemaSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(1, 'O nome do cinema é obrigatório'),
    endereco: z.string().min(1, 'O endereço do cinema é obrigatório'),
    listasalas: z.array(z.string().uuid()),
    listafilmes: z.array(z.string().uuid()),
    listasessoes: z.array(z.string().uuid())
});