import { Button } from "../../../components/Button";
import type { ISala } from "../../../models/salas.model";


interface SalaTableProps {
    salas: ISala[];
    onEdit: (sala: ISala) => void;
    onDelete: (salaId: string) => void;
    salaEmEdicao: ISala | null; // Nova prop
}

export const SalaTable = (
    { salas, onEdit, onDelete, salaEmEdicao }: SalaTableProps) => {

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Número</th>
                        <th>Capacidade</th>
                        <th>Tipo</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {salas.map((sala) => {
                        const desabilitado = !!salaEmEdicao;
                        return (
                            <tr key={sala.id}>
                                <td>{sala.id}</td>
                                <td>{sala.nome}</td>
                                <td>{sala.numero}</td>
                                <td>{sala.capacidade}</td>
                                <td>{sala.tipo}</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        label="Editar"
                                        variant="warning"
                                        value=""
                                        onClick={() => onEdit(sala)}
                                        disabled={desabilitado}
                                    />
                                    <Button
                                        label="Excluir"
                                        value=""
                                        variant="danger"
                                        onClick={() => onDelete(sala.id || '')}
                                        disabled={desabilitado}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}