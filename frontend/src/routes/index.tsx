import { Route, Routes } from "react-router-dom";
import { Filmes } from "../pages/Filmes";
import { Home } from "../pages/Home";
import { Salas } from "../pages/Salas";
import { Sessoes } from "../pages/Sessoes";


export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gerenciar-filmes" element={<Filmes />} />
                <Route path="/gerenciar-salas" element={<Salas />} />
                <Route path="/gerenciar-sessoes" element={<Sessoes />} />
            </Routes>
        </>
    );
}