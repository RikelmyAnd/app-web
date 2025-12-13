{/*import { Button } from "../../../components/Button";
import type { IFilme } from "../../../models/filmes.model";


interface FilmeTableProps {
    filmes: IFilme[];
    onEdit: (filme: IFilme) => void;
    onDelete: (filmeId: string) => void;
    filmeEmEdicao: IFilme | null; // Nova prop
}

export const FilmeTable = (
    { filmes, onEdit, onDelete, filmeEmEdicao }: FilmeTableProps) => {

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Classificação Indicativa</th>
                        <th>Duração (min)</th>
                        <th>Elenco</th>
                        <th>Gênero</th>
                        <th>Data Inicial de Exibição</th>
                        <th>Data Final de Exibição</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {filmes.map((filme) => {
                        const desabilitado = !!filmeEmEdicao;
                        return (
                            <tr key={filme.id}>
                                <td>{filme.id}</td>
                                <td>{filme.titulo}</td>
                                <td>{filme.sinopse}</td>
                                <td>{filme.classificacaoIndicativa}</td>
                                <td>{filme.duracao}</td>
                                <td>{filme.elenco}</td>
                                <td>{filme.genero}</td>
                                <td>{filme.dataInicialExibicao}</td>
                                <td>{filme.dataFinalExibicao}</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        label="Editar"
                                        variant="warning"
                                        value=""
                                        onClick={() => onEdit(filme)}
                                        disabled={desabilitado}
                                    />
                                    <Button
                                        label="Excluir"
                                        value=""
                                        variant="danger"
                                        onClick={() => onDelete(filme.id || '')}
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
}*/}