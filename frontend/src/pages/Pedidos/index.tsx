import { useEffect, useState } from "react";
import { pedidosService, type IPedido } from "../../services/pedidos.service";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const PedidosLista = () => {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const data = await pedidosService.findAll();
            setPedidos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Deseja cancelar este pedido?")) {
            await pedidosService.delete(id);
            carregarPedidos();
        }
    };

    return (
        <div className="container mt-4">
            <h2>Pedidos Realizados</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Ingressos (Qtd)</th>
                        <th>Lanches</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
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
                    ))}
                    {pedidos.length === 0 && <tr><td colSpan={6} className="text-center">Nenhum pedido encontrado.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};