import { useEffect, useState } from "react";
import { salaSchema, type ISala } from "../../models/salas.model";
import { SalasCadastro } from "./SalasCadastro";
import { salasService } from "../../services/salas.service";
import { SalaTable } from "./SalasTabela";

export const Salas = () => {
    // ==================== ESTADOS ====================
    const [sala, setSala] = useState<ISala | null>(null);
    const [listaSalas, setListaSalas] = useState<ISala[]>([]);
    const [erros, setErrorsState] = useState({});
    const [visao, setVisao] = useState<'lista' | 'cadastro'>('lista');
    const [keyReiniciar, setKeyReiniciar] = useState(0);
     const [salaEmEdicao, setSalaEmEdicao] = useState<ISala | null>(null);


const carregarSalas = async () => {
    try {
        const salas = await salasService.findAll();
        setListaSalas(salas);
    } catch (error) {
        console.error("Erro ao carregar salas:", error);
    }
};

// ==================== EFEITOS ====================
useEffect(() => {
    // Carrega a lista de usuários ao montar o componente
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarSalas();
}, []);

/**
 * Valida os dados do usuário usando Zod
 * @returns Dados validados ou null se houver erro
 */
const validarSalas = (sala: ISala): ISala | null => {
    setErrorsState({});

    const result = salaSchema.safeParse(sala);

    if (!result.success) {
        console.log("ERROS DE VALIDAÇÃO:", result.error.format());
        const errosFormatados: Record<string, string> = {};
        result.error.issues.forEach((err) => {
            if (err.path[0]) {
                errosFormatados[err.path[0] as string] = err.message;
            }
        });
        setErrorsState(errosFormatados);
        return null;
    }

    return result.data;
};

/**
 * Verifica se é uma operação de edição (ID existe e não é vazio)
 */
const isEdicao = (sala: ISala): boolean => {
    return Boolean(sala.id && sala.id.trim() !== '');
};

/**
 * Limpa o formulário e reseta estados
 */
const limparFormulario = () => {
    setSala(null);
    setErrorsState({});
    setKeyReiniciar(prev => prev + 1);
};

// ==================== HANDLERS ====================

/**
 * Cria um novo usuário no backend
 */
const handleCreate = async (sala: ISala) => {
    try {
        // Remove a propriedade 'id' antes de enviar
        const {id, ...dadosNovoSala } = sala;

        const novaSala = await salasService.create(dadosNovoSala as ISala);
        setListaSalas((listaAtual) => [...listaAtual, novaSala]);
        limparFormulario();
    } catch (error) {
        console.error("Erro ao criar sala:", error);
    }
};

/**
 * Atualiza um usuário existente no backend
 */
const handleUpdate = async (sala: ISala) => {
    try {
        await salasService.update(sala.id!, sala);
        setListaSalas((listaAtual) =>
            listaAtual.map((f) => (f.id === sala.id ? sala : f))
        );
        limparFormulario();
    } catch (error) {
        console.error("Erro ao atualizar sala:", error);
    }
};

/**
 * Salva usuário (cria ou edita baseado no ID)
 */
const handleSave = async (sala: ISala) => {
    const result = salaSchema.safeParse(sala);
       
        if (!result.success) {
            const errosFormatados: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    errosFormatados[err.path[0] as string] = err.message;
                }
            });
            setErrorsState(errosFormatados);
            return;
        }
    
        setErrorsState({});
    
       try {
            const { id, ...dadosParaSalvar } = sala;
            
            if (id && id.trim() !== '') {
                await salasService.update(sala.id, sala);
            } else {
                console.log("3. Chamando create com:", dadosParaSalvar);
                await salasService.create(dadosParaSalvar as ISala);
            }
    
            alert("Salvo com sucesso!"); // Feedback visual
            carregarSalas();
            setVisao('lista');
            setSalaEmEdicao(null);
            // ... (resto do código de sucesso)
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar a sessão.");
        }
};

/**
 * Cancela a operação atual e limpa o formulário
 */
const handleCancel = () => {
    limparFormulario();
};

/**
 * Prepara o formulário para edição de um usuário
 */
const handleEdit = (sala: ISala) => {
    setSala(sala);
    setErrorsState({});
};

/**
 * Exclui um usuário do backend
 */
const handleDelete = async (salaId: string) => {
    try {
        await salasService.delete(salaId);
        setListaSalas((listaAtual) => listaAtual.filter((f) => f.id !== salaId));
    } catch (error) {
        console.error("Erro ao excluir sala:", error);
    }
};
return (
    <>
        <>
            <div className="row m-4 border-bottom">
                <h4>Cadastrar Salas</h4>
            </div>

            <div className="container row m-4">
                {/* Formulário */}
                <div className="col-12 col-md-6 col-lg-6">
                    <SalasCadastro
                        key={sala ? sala.id : `new-${keyReiniciar}`}
                        sala={sala}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        erros={erros}
                    />
                </div>

                <div className="col-20 col-md-20 col-lg-20">
                    <hr />
                    <SalaTable
                        salas={listaSalas}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        salaEmEdicao={sala}
                    />
                </div>
            </div>
        </>
    </>
);

}
