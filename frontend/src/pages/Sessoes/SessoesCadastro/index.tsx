import { useState } from "react";
import type { ISessao } from "../../../models/sessao.model";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import type { IFilme } from "../../../models/filmes.model";
import type { ISala } from "../../../models/salas.model";


interface SessoesCadastro {
    key?: string;
    filmesDisponiveis: IFilme[];
    salasDisponiveis: ISala[];
    sessao: ISessao | null;
    onSave: (sessao: ISessao) => void;
    onCancel: () => void;
    erros?: Record<string, string>;
}

export const SessoesCadastro = ({ sessao, filmesDisponiveis, salasDisponiveis, onSave, onCancel, erros = {} }: SessoesCadastro) => {
    const [sessaoState, setSessaoState] = useState<ISessao>(sessao || { id: '', horario: '', salaId: '', filmeId: '', valorIngresso: 0 });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSessaoState({ ...sessaoState, [name]: value });
    }
    const opcoesFilmes = filmesDisponiveis.map(filme => ({
        value: filme.id,
        label: filme.titulo
    }));
    const opcoesSalas = salasDisponiveis.map(sala => ({
        value: sala.id,
        label: sala.nome
    }));

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body bg-light">
                            <h5 className="card-title">Cadastro de Sessôes</h5>
                            <hr />
                            <div className="container">
                                <form onSubmit={(e) => { e.preventDefault(); onSave(sessaoState); }} >
                                    <Select
                                        label="Escolha o Filme"
                                        name="filmeId"
                                        id="filmeId"
                                        value={sessaoState.filmeId}
                                        options={opcoesFilmes} // Lista preparada
                                        onChange={(e) => setSessaoState({ ...sessaoState, filmeId: e.target.value })}
                                        error={erros.filmeId}
                                    />
                                    <Select
                                        label="Escolha a Sala"
                                        name="salaId"
                                        id="salaId"
                                        value={sessaoState.salaId}
                                        options={opcoesSalas} // Lista preparada
                                        onChange={(e) => setSessaoState({ ...sessaoState, salaId: e.target.value })}
                                        error={erros.salaId}
                                    />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Input
                                                name="Data e Hora"
                                                id="dataHora"
                                                type="datetime-local"
                                                value={sessaoState.horario}
                                                onChange={handleChange}
                                                error={erros.horario}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                name="Valor do Ingresso (R$)"
                                                id="valorIngresso"
                                                type="number"
                                                value={sessaoState.valorIngresso || ''}
                                                onChange={(e) => setSessaoState({
                                                    ...sessaoState,
                                                    valorIngresso: Number(e.target.value)
                                                })}
                                                error={erros.valorIngresso}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="row m-2">
                                <div className="col-6">
                                    <Button
                                        value="Cancelar"
                                        label="Cancelar"
                                        variant="secondary"
                                        type="button"
                                        onClick={onCancel} />
                                </div>
                                <div className="col-6">
                                    <Button
                                        label={sessaoState.id ? "Atualizar" : "Salvar"}
                                        value={sessaoState.id ? "Atualizar" : "Salvar"}
                                        variant={sessaoState.id ? "warning" : "primary"}
                                        type="submit"
                                        onClick={() => { onSave(sessaoState) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
