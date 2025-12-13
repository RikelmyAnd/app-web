import { Route, Routes } from "react-router-dom";
import { Filmes } from "../pages/Filmes";
import { Home } from "../pages/Home";
import { Salas } from "../pages/Salas";
import { Sessoes } from "../pages/Sessoes";
import { PedidosLista } from "../pages/Pedidos";
import { VendaProcesso } from "../pages/Vendas";


export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gerenciar-filmes" element={<Filmes />} />
                <Route path="/gerenciar-salas" element={<Salas />} />
                <Route path="/gerenciar-sessoes" element={<Sessoes />} />
                <Route path="/comprar/:sessaoId" element={<VendaProcesso />} />
                <Route path="/pedidos" element={<PedidosLista />} />
                <Route path="/pedidos/editar/:pedidoId" element={<VendaProcesso />} />
            </Routes>
        </>
    );
}