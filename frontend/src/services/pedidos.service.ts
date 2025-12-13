export interface IPedidoItemLanche {
    lancheId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

export interface IPedidoIngresso {
    assento: string;
    tipo: 'inteira' | 'meia';
    preco: number;
}

export interface IPedido {
    id: string;
    sessaoId: string;
    dataCompra: string;
    ingressos: IPedidoIngresso[];
    lanches: IPedidoItemLanche[];
    valorTotal: number;
}

const API_URL = 'http://localhost:3000/pedidos';

export const pedidosService = {
    async findAll(): Promise<IPedido[]> {
        const response = await fetch(API_URL);
        return response.json();
    },
    async findById(id: string): Promise<IPedido> {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    },
    async create(pedido: Omit<IPedido, 'id'>): Promise<IPedido> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        return response.json();
    },
    async update(id: string, pedido: IPedido): Promise<IPedido> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        return response.json();
    },
    async delete(id: string): Promise<void> {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    }
};