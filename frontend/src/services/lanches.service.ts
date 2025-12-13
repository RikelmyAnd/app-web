export interface ILanche { 
    id: string; 
    nome: string; 
    preco: number; 
}

const API_URL = 'http://localhost:3000/lanches';

export const lanchesService = {
    async findAll(): Promise<ILanche[]> {
        const response = await fetch(API_URL);
        return response.json();
    }
};