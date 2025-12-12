import { useEffect, useState } from "react";
import { filmeSchema, type IFilme } from "../../models/filmes.model";
import { FilmesCadastro } from "./FilmesCadastro";
import { filmesService } from "../../services/filmes.service";
import { FilmeTable } from "./FilmesTabela";

export const Filmes = () => {
    // ==================== ESTADOS ====================
    const [filme, setFilme] = useState<IFilme | null>(null);
    const [listaFilmes, setListaFilmes] = useState<IFilme[]>([]);
    const [erros, setErrorsState] = useState({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);


const carregarFilmes = async () => {
    try {
        const filmes = await filmesService.findAll();
        setListaFilmes(filmes);
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
};

// ==================== EFEITOS ====================
useEffect(() => {
    // Carrega a lista de usuários ao montar o componente
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarFilmes();
}, []);

/**
 * Valida os dados do usuário usando Zod
 * @returns Dados validados ou null se houver erro
 */
const validarFilmes = (filme: IFilme): IFilme | null => {
    setErrorsState({});

    const result = filmeSchema.safeParse(filme);

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
const isEdicao = (filme: IFilme): boolean => {
    return Boolean(filme.id && filme.id.trim() !== '');
};

/**
 * Limpa o formulário e reseta estados
 */
const limparFormulario = () => {
    setFilme(null);
    setErrorsState({});
    setKeyReiniciar(prev => prev + 1);
};

// ==================== HANDLERS ====================

/**
 * Cria um novo usuário no backend
 */
const handleCreate = async (filme: IFilme) => {
    try {
        // Remove a propriedade 'id' antes de enviar
        const {id, ...dadosNovoFilme } = filme;

        const novoFilme = await filmesService.create(dadosNovoFilme as IFilme);
        setListaFilmes((listaAtual) => [...listaAtual, novoFilme]);
        limparFormulario();
    } catch (error) {
        console.error("Erro ao criar filme:", error);
    }
};

/**
 * Atualiza um usuário existente no backend
 */
const handleUpdate = async (filme: IFilme) => {
    try {
        await filmesService.update(filme.id!, filme);
        setListaFilmes((listaAtual) =>
            listaAtual.map((f) => (f.id === filme.id ? filme : f))
        );
        limparFormulario();
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
    }
};

/**
 * Salva usuário (cria ou edita baseado no ID)
 */
const handleSave = async (filme: IFilme) => {
    const filmeValidado = validarFilmes(filme);

    if (!filmeValidado) {
        return; // Validação falhou, erros já foram setados
    }

    if (isEdicao(filmeValidado)) {
        handleUpdate(filmeValidado);
    } else {
        handleCreate(filmeValidado);
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
const handleEdit = (usuario: IFilme) => {
    setFilme(usuario);
    setErrorsState({});
};

/**
 * Exclui um usuário do backend
 */
const handleDelete = async (filmeId: string) => {
    try {
        await filmesService.delete(filmeId);
        setListaFilmes((listaAtual) => listaAtual.filter((f) => f.id !== filmeId));
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
    }
};
return (
    <>
        <>
            <div className="row m-4 border-bottom">
                <h4>Cadastrar Filmes</h4>
            </div>

            <div className="container row m-4">
                {/* Formulário */}
                <div className="col-12 col-md-6 col-lg-6">
                    <FilmesCadastro
                        key={filme ? filme.id : `new-${keyReiniciar}`}
                        filme={filme}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        erros={erros}
                    />
                </div>

                <div className="col-20 col-md-20 col-lg-20">
                    <hr />
                    <FilmeTable
                        filmes={listaFilmes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        filmeEmEdicao={filme}
                    />
                </div>
            </div>
        </>
    </>
);

}
