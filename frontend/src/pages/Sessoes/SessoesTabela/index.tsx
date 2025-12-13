import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import type { ISessao } from "../../../models/sessao.model";
import type { IFilme } from "../../../models/filmes.model";
import type { ISala } from "../../../models/salas.model";

interface SessaoTableProps {
    sessoes: ISessao[];
    filmes: IFilme[];
    salas: ISala[];
    onEdit: (sessao: ISessao) => void;
    onDelete: (sessaoId: string) => void;
    sessaoEmEdicao: ISessao | null; // Nova prop
}



export const SessaoTable = (
    
    
    { sessoes, filmes, salas, onEdit, onDelete, sessaoEmEdicao }: SessaoTableProps) => {

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
                        const filmeEncontrado = filmes.find(f => f.id === sessao.filmeId);
                        const salaEncontrada = salas.find(s => s.id === sessao.salaId);
                        const desabilitado = !!sessaoEmEdicao;
                        return (
                            <tr key={sessao.id}>
                                <td>{sessao.id}</td>
                                <td>{new Date(sessao.dataHora).toLocaleString('pt-BR')}</td>
                                <td>{filmeEncontrado ? filmeEncontrado.titulo : <span className="text-muted">Filme não encontrado ({sessao.filmeId})</span>}</td>
                                <td>
                                    {salaEncontrada
                                        ? `${salaEncontrada.nome} - Nº ${salaEncontrada.numero}`
                                        : <span className="text-muted">Sala não encontrada ({sessao.salaId})</span>
                                    }
                                </td>
                                <td>{sessao.valorIngresso ? sessao.valorIngresso.toFixed(2) : '0.00'}</td>
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
                                    <Button
                                        label="Comprar Ingresso"
                                        value=""
                                        variant="dark"
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