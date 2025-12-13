import { useEffect, useState } from "react";
import { sessaoSchema, type ISessao } from "../../models/sessao.model";
import { SessoesCadastro } from "./SessoesCadastro";
import { sessoesService } from "../../services/sessoes.service";
import type { ISala } from "../../models/salas.model";
import type { IFilme } from "../../models/filmes.model";
import { filmesService } from "../../services/filmes.service";
import { Button } from "../../components/Button";
import { salasService } from "../../services/salas.service";
import { SessaoTable } from "./SessoesTabela";

export const Sessoes = () => {
    // ==================== ESTADOS ====================
    const [sessao, setSessao] = useState<ISessao | null>(null);
    const [listaSessoes, setListaSessoes] = useState<ISessao[]>([]);
    const [erros, setErrorsState] = useState({});
    const [keyReiniciar, setKeyReiniciar] = useState(0);
    const [listaFilmes, setListaFilmes] = useState<IFilme[]>([]);
    const [listaSalas, setListaSalas] = useState<ISala[]>([]);


    const carregarDados = async () => {
        try {
            const sessoes = await sessoesService.findAll();
            setListaSessoes(sessoes);
            const filmes = await filmesService.findAll();
            setListaFilmes(filmes);
            const salas = await salasService.findAll();
            setListaSalas(salas);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    // ==================== EFEITOS ====================
    useEffect(() => {
        // Carrega a lista de usuários ao montar o componente
        // eslint-disable-next-line react-hooks/set-state-in-effect
        carregarDados();
    }, []);

    /**
     * Valida os dados do usuário usando Zod
     * @returns Dados validados ou null se houver erro
     */
    const validarSessoes = (sessao: ISessao): ISessao | null => {
        setErrorsState({});

        const result = sessaoSchema.safeParse(sessao);

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
    const isEdicao = (sessao: ISessao): boolean => {
        return Boolean(sessao.id && sessao.id.trim() !== '');
    };

    /**
     * Limpa o formulário e reseta estados
     */
    const limparFormulario = () => {
        setSessao(null);
        setErrorsState({});
        setKeyReiniciar(prev => prev + 1);
    };

    // ==================== HANDLERS ====================

    /**
     * Cria um novo usuário no backend
     */
    const handleCreate = async (sessao: ISessao) => {
        try {
            // Remove a propriedade 'id' antes de enviar
            const { id, ...dadosNovaSessao } = sessao;

            const novaSessao = await sessoesService.create(dadosNovaSessao as ISessao);
            setListaSessoes((listaAtual) => [...listaAtual, novaSessao]);
            limparFormulario();
        } catch (error) {
            console.error("Erro ao criar sessão:", error);
        }
    };

    /**
     * Atualiza um usuário existente no backend
     */
    const handleUpdate = async (sessao: ISessao) => {
        try {
            await sessoesService.update(sessao.id!, sessao);
            setListaSessoes((listaAtual) =>
                listaAtual.map((s) => (s.id === sessao.id ? sessao : s))
            );
            limparFormulario();
        } catch (error) {
            console.error("Erro ao atualizar sessão:", error);
        }
    };

    /**
     * Salva usuário (cria ou edita baseado no ID)
     */
    const handleSave = async (sessao: ISessao) => {

        const sessaoValidada = validarSessoes(sessao);

        if (!sessaoValidada) {
            return; // Validação falhou, erros já foram setados
        }

        setErrorsState({});

        if (isEdicao(sessaoValidada)) {
            handleUpdate(sessaoValidada);
        } else {
            handleCreate(sessaoValidada);
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
    const handleEdit = (sessao: ISessao) => {
        setSessao(sessao);
        setErrorsState({});
    };

    /**
     * Exclui um usuário do backend
     */
    const handleDelete = async (sessaoId: string) => {
        try {
            await sessoesService.delete(sessaoId);
            setListaSessoes((listaAtual) => listaAtual.filter((s) => s.id !== sessaoId));
        } catch (error) {
            console.error("Erro ao excluir sessão:", error);
        }
    };
    return (
        <>
            <>
                <div className="row m-4 border-bottom">
                    <div className="col-12 col-md-6 col-lg-6">
                        <SessoesCadastro
                            key={sessao ? sessao.id : `new-${keyReiniciar}`}
                            sessao={sessao}
                            filmesDisponiveis={listaFilmes} // Passa os filmes
                            salasDisponiveis={listaSalas}   // Passa as salas
                            onSave={handleSave}
                            onCancel={handleCancel}
                            erros={erros} // Se tiver estado de erros, passe aqui
                        />
                    </div>
                </div>
                <div className="row m-4 border-bottom">
                    <div className="col-20 col-md-20 col-lg-20">
                        <hr />
                        <SessaoTable
                            sessoes={listaSessoes}
                            filmes={listaFilmes}
                            salas={listaSalas}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            sessaoEmEdicao={sessao} />
                    </div>
                </div>




            </>
        </>
    );

}
