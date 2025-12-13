import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <>
            <div className="d-flex justify-content-center bg-dark p-3 mb-5">
                <ul className="nav">
                    <li className="nav-item mx-3">
                        <Link to="/" className="nav-link text-white">Home</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link to="/gerenciar-filmes" className="nav-link text-white">Gerenciar Filmes</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link to="/gerenciar-salas" className="nav-link text-white">Gerenciar Salas</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link to="/gerenciar-sessoes" className="nav-link text-white">Gerenciar Sessões</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link to="/pedidos" className="nav-link text-white">Gerenciar Pedidos</Link>
                    </li>
                </ul>   
            </div>
         </>
    );
}