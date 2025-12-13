import { Button } from "../../../components/Button";
import type { ISessao } from "../../../models/sessao.model";


interface SessaoTableProps {
    sessoes: ISessao[];
    onEdit: (sessao: ISessao) => void;
    onDelete: (sessaoId: string) => void;
    sessaoEmEdicao: ISessao | null; // Nova prop
}

export const SessaoTable = (
    { sessoes, onEdit, onDelete, sessaoEmEdicao }: SessaoTableProps) => {

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data e Hora</th>
                        <th>Filme</th>
                        <th>Sala</th>
                        <th>Valor do Ingresso</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {sessoes.map((sessao) => {
                        const desabilitado = !!sessaoEmEdicao;
                        return (
                            <tr key={sessao.id}>
                                <td>{sessao.id}</td>
                                <td>{sessao.dataHora}</td>
                                <td>{sessao.filmeId}</td>
                                <td>{sessao.salaId}</td>
                                <td>{sessao.valorIngresso}</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        label="Editar"
                                        variant="warning"
                                        value=""
                                        onClick={() => onEdit(sessao)}
                                        disabled={desabilitado}
                                    />
                                    <Button
                                        label="Excluir"
                                        value=""
                                        variant="danger"
                                        onClick={() => onDelete(sessao.id || '')}
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