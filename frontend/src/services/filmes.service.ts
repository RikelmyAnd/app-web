import { type IFilme } from "../models/filmes.model";

// Variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/filmes';

export class FilmesService {
    
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorMessage = await response.text().catch(() => response.statusText);
                throw new Error(`Erro API (${response.status}): ${errorMessage}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição para ${url}:`, error);
            throw error;
        }
    }

    async findAll(): Promise<IFilme[]> {
        return this.request<IFilme[]>('');
    }

    async findById(id: number | string): Promise<IFilme> {
        this.validateId(id);
        return this.request<IFilme>(`/${id}`);
    }

    async create(filme: Omit<IFilme, 'id'>): Promise<IFilme> {
        return this.request<IFilme>('', {
            method: 'POST',
            body: JSON.stringify(filme),
        });
    }

    /**
     * ✅ CORREÇÃO APLICADA AQUI:
     * Removemos o 'id' do corpo da requisição para não dar conflito no backend.
     */
    async update(id: number | string, filme: Partial<IFilme>): Promise<IFilme> {
        this.validateId(id);

        // Separa o ID do resto dos dados
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: idIgnorado, ...dadosParaSalvar } = filme;

        return this.request<IFilme>(`/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(dadosParaSalvar), // Envia apenas os dados, sem o ID
        });
    }

    async delete(id: number | string): Promise<void> {
        this.validateId(id);
        await this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }

    private validateId(id: number | string): void {
        if (!id) throw new Error('O ID do usuário é obrigatório e inválido.');
    }
}

export const filmesService = new FilmesService();