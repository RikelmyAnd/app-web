import { useEffect, useState } from "react";
import { pedidosService, type IPedido } from "../../services/pedidos.service";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import type { IFilme } from "../../models/filmes.model";
import type { ISala } from "../../models/salas.model";
import type { ISessao } from "../../models/sessao.model";
import { filmesService } from "../../services/filmes.service";
import { salasService } from "../../services/salas.service";
import { sessoesService } from "../../services/sessoes.service";

export const PedidosLista = () => {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const [pedidosData, filmesData, salasData, sessoesData] = await Promise.all([
                pedidosService.findAll(),
                filmesService.findAll(),
                salasService.findAll(),
                sessoesService.findAll()]);

            setPedidos(pedidosData);
            setFilmes(filmesData);
            setSalas(salasData);
            setSessoes(sessoesData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Deseja cancelar este pedido?")) {
            try {
                await pedidosService.delete(id);
                const data = await pedidosService.findAll();
                setPedidos(data);
            } catch (err) {
                console.error("Erro ao excluir pedido:", err);
            }
        }
    };

    const getInfoPedido = (sessaoId: string) => {
        const sessao = sessoes.find(s => s.id === sessaoId);
        if (!sessao) return { filme: 'Sessão não encontrada', sala: '-', horario: '-' };

        const filme = filmes.find(f => String(f.id) === String(sessao.filmeId))?.titulo || 'Filme não encontrado';
        const sala = salas.find(s => String(s.id) === String(sessao.salaId))?.nome || 'Sala não encontrada';

        // Formata a data da sessão
        const horario = new Date(sessao.dataHora).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        return { filme, sala, horario };
    };

    return (
        <div className="container mt-4">
            <h2>Pedidos Realizados</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Filme</th>
                        <th>Sala</th>
                        <th>Data da Compra</th>
                        <th>Ingressos (Qtd)</th>
                        <th>Lanches</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(p => {
                        const info = getInfoPedido(p.sessaoId);
                        return (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    <strong>{info.filme}</strong>
                                    <br />
                                    <small className="text-muted">{info.horario}</small>
                                </td>
                                <td>{info.sala}</td>
                                <td>{new Date(p.dataCompra).toLocaleString('pt-BR')}</td>
                                <td>{p.ingressos.length}</td>
                                <td>
                                    {p.lanches.length > 0
                                        ? p.lanches.map(l => `${l.quantidade}x ${l.nome}`).join(', ')
                                        : 'Nenhum'}
                                </td>
                                <td>R$ {p.valorTotal.toFixed(2)}</td>
                                <td>
                                    <Button
                                        label="Editar"
                                        variant="warning"
                                        value=""
                                        onClick={() => navigate(`/pedidos/editar/${p.id}`)}
                                    />
                                    <span className="mx-1"></span>
                                    <Button
                                        label="Excluir"
                                        variant="danger"
                                        value=""
                                        onClick={() => handleDelete(p.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    {pedidos.length === 0 && <tr><td colSpan={6} className="text-center">Nenhum pedido encontrado.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};