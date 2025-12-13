import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sessoesService } from "../../services/sessoes.service";
import { lanchesService, type ILanche } from "../../services/lanches.service";
import { pedidosService, type IPedidoIngresso, type IPedidoItemLanche } from "../../services/pedidos.service";
import { type ISessao } from "../../models/sessao.model";
import { type ISala } from "../../models/salas.model";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { salasService } from "../../services/salas.service";

export const VendaProcesso = () => {
    const { sessaoId, pedidoId } = useParams();
    const navigate = useNavigate();
    const [passo, setPasso] = useState(1);

    // Dados carregados
    const [sessao, setSessao] = useState<ISessao | null>(null);
    const [listaLanches, setListaLanches] = useState<ILanche[]>([]);
    const [sala, setSala] = useState<ISala | null>(null);

    // Estado do Pedido
    const [ingressosSelecionados, setIngressosSelecionados] = useState<IPedidoIngresso[]>([]);
    const [lanchesSelecionados, setLanchesSelecionados] = useState<IPedidoItemLanche[]>([]);

    useEffect(() => {
        carregarDadosIniciais();
    }, [sessaoId, pedidoId]);

    const carregarDadosIniciais = async () => {
        const lanches = await lanchesService.findAll();
        setListaLanches(lanches);
try {
            const lanches = await lanchesService.findAll();
            setListaLanches(lanches);

            let sessaoAtual: ISessao | undefined;
        if (pedidoId) {
                // Modo Edição
                const pedido = await pedidosService.findById(pedidoId);
                sessaoAtual = await sessoesService.findById(pedido.sessaoId);
                setIngressosSelecionados(pedido.ingressos);
                setLanchesSelecionados(pedido.lanches);
            } else if (sessaoId) {
                // Modo Nova Compra
                const sessoes = await sessoesService.findAll();
                sessaoAtual = sessoes.find(s => s.id === sessaoId);
            }

        if (sessaoAtual) {
                setSessao(sessaoAtual);
                
                // CARREGAR A SALA AQUI
                // Assim garantimos que temos a capacidade disponível
                const salaEncontrada = await salasService.findById(sessaoAtual.salaId);
                setSala(salaEncontrada);
            }
            } catch (error) {
            console.error("Erro ao carregar dados", error);
            alert("Erro ao carregar dados da venda.");
        }
    };

    // --- LÓGICA DO PASSO 1: INGRESSOS ---
    const adicionarIngresso = async () => {
        // Validação simples de capacidade (pode ser melhorada buscando a sala)
        if (!sessao || !sala) {
            alert("Aguarde o carregamento dos dados.");
            return;
        }

        // 2. Agora validamos a capacidade usando a sala carregada
        if (ingressosSelecionados.length >= sala.capacidade) { 
            alert(`Capacidade máxima da sala atingida (${sala.capacidade} lugares).`);
            return;
        }

        const novoIngresso: IPedidoIngresso = {
            assento: `Assento ${ingressosSelecionados.length + 1}`, // Simplificação. Ideal seria um mapa de assentos
            tipo: 'inteira',
            preco: sessao?.valorIngresso || 0
        };
        setIngressosSelecionados([...ingressosSelecionados, novoIngresso]);
    };

    const alterarTipoIngresso = (index: number, tipo: 'inteira' | 'meia') => {
        const lista = [...ingressosSelecionados];
        const precoBase = sessao?.valorIngresso || 0;
        lista[index].tipo = tipo;
        lista[index].preco = tipo === 'meia' ? precoBase / 2 : precoBase;
        setIngressosSelecionados(lista);
    };

    const removerIngresso = (index: number) => {
        const lista = ingressosSelecionados.filter((_, i) => i !== index);
        setIngressosSelecionados(lista);
    };

    // --- LÓGICA DO PASSO 2: LANCHES ---
    const atualizarQtdLanche = (lanche: ILanche, qtd: number) => {
        if (qtd < 0) return;

        const existe = lanchesSelecionados.find(l => l.lancheId === lanche.id);
        let novaLista = [...lanchesSelecionados];

        if (existe) {
            if (qtd === 0) {
                novaLista = novaLista.filter(l => l.lancheId !== lanche.id);
            } else {
                existe.quantidade = qtd;
            }
        } else if (qtd > 0) {
            novaLista.push({
                lancheId: lanche.id,
                nome: lanche.nome,
                precoUnitario: lanche.preco,
                quantidade: qtd
            });
        }
        setLanchesSelecionados(novaLista);
    };

    const getQuantidadeAtual = (id: string) => {
        return lanchesSelecionados.find(l => l.lancheId === id)?.quantidade || 0;
    };

    // --- FINALIZAÇÃO ---
    const calcularTotal = () => {
        const totalIngressos = ingressosSelecionados.reduce((acc, curr) => acc + curr.preco, 0);
        const totalLanches = lanchesSelecionados.reduce((acc, curr) => acc + (curr.quantidade * curr.precoUnitario), 0);
        return totalIngressos + totalLanches;
    };

    const handleSalvar = async () => {
        if (!sessao) return;

        const payload = {
            sessaoId: sessao.id,
            dataCompra: new Date().toISOString(),
            ingressos: ingressosSelecionados,
            lanches: lanchesSelecionados,
            valorTotal: calcularTotal()
        };

        try {
            if (pedidoId) {
                await pedidosService.update(pedidoId, { id: pedidoId, ...payload });
                alert("Pedido atualizado!");
            } else {
                await pedidosService.create(payload);
                alert("Compra realizada com sucesso!");
            }
            navigate('/pedidos');
        } catch (error) {
            console.error(error);
            alert("Erro ao processar pedido.");
        }
    };

    if (!sessao) return <div>Carregando sessão...</div>;

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body bg-light">
                        <div className="col-md-6">
                            <h3>{pedidoId ? "Editar Pedido" : "Comprar Ingresso"}</h3>
                            <span>Total: R$ {calcularTotal().toFixed(2)}</span>
                        </div>
                        <div className="container">
                            {passo === 1 ? (
                                <>
                                    <h5>Passo 1: Selecione os Ingressos ({sessao.dataHora})</h5>
                                    <hr />
                                    <div className="mb-3">
                                        <Button label="Adicionar Assento" variant="secondary" onClick={adicionarIngresso} value="" />
                                    </div>

                                    <table className="table">
                                        <thead><tr><th>Assento</th><th>Tipo</th><th>Preço</th><th>Ação</th></tr></thead>
                                        <tbody>
                                            {ingressosSelecionados.map((ing, idx) => (
                                                <tr key={idx}>
                                                    <td>{ing.assento}</td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            value={ing.tipo}
                                                            onChange={(e) => alterarTipoIngresso(idx, e.target.value as 'inteira' | 'meia')}
                                                        >
                                                            <option value="inteira">Inteira</option>
                                                            <option value="meia">Meia</option>
                                                        </select>
                                                    </td>
                                                    <td>R$ {ing.preco.toFixed(2)}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-danger" onClick={() => removerIngresso(idx)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {ingressosSelecionados.length === 0 && <tr><td colSpan={4}>Nenhum ingresso selecionado.</td></tr>}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            label="Próximo: Lanches"
                                            variant="primary"
                                            value=""
                                            onClick={() => setPasso(2)}
                                            disabled={ingressosSelecionados.length === 0}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h5>Passo 2: Escolha seus Lanches (Opcional)</h5>
                                    <hr />
                                    <div className="row">
                                        {listaLanches.map(lanche => (
                                            <div key={lanche.id} className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="card-body text-center">
                                                        <h6>{lanche.nome}</h6>
                                                        <p className="text-muted">R$ {lanche.preco.toFixed(2)}</p>
                                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                                            <Input
                                                                name="quantidade"
                                                                id="quantidade"
                                                                type="number"
                                                                value={getQuantidadeAtual(lanche.id)}
                                                                onChange={(e) => atualizarQtdLanche(lanche, Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="d-flex justify-content-between mt-4">
                                        <Button label="Voltar" variant="secondary" onClick={() => setPasso(1)} value="" />
                                        <Button label="Finalizar Pedido" variant="success" onClick={handleSalvar} value="" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};