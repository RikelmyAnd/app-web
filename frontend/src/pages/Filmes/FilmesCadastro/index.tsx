import { useState } from "react";
import type { IFilme } from "../../../models/filmes.model";
import { Select } from "../../../components/Select";
import { ClassificacaoIndicativa, Genero } from "../../../models/filmes.model";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";


interface FilmesCadastro {
    key?: string;
    filme: IFilme | null;
    onSave: (filme: IFilme) => void;
    onCancel: () => void;
    erros?: Record<string, string>;
}

export const FilmesCadastro = ({ filme, onSave, onCancel, erros = {} }: FilmesCadastro) => {
    const [filmeState, setFilmeState] = useState<IFilme>(filme || { id: '', titulo: '', sinopse: '', classificacaoIndicativa: '', duracao: 0, elenco: '', genero: '', dataInicialExibicao: '', dataFinalExibicao: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilmeState({ ...filmeState, [name]: value });
    }

    const opcoesClassificacao = Object.values(ClassificacaoIndicativa).map(valor => ({
        value: valor,
        label: valor
    }));

    const opcoesGenero = Object.values(Genero).map(valor => ({
        value: valor,
        label: valor
    }));

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body bg-light">
                            <h5 className="card-title">Cadastro de Filmes</h5>
                            <hr />
                            <div className="container">
                                <form onSubmit={(e) => { e.preventDefault(); onSave(filmeState); }} >
                                    <Input
                                        name="titulo"
                                        id="titulo"
                                        type="text"
                                        placeholder="Digite o titulo do filme"
                                        value={filmeState.titulo}
                                        onChange={handleChange}
                                        error={erros.titulo}
                                    />
                                    <Input
                                        name="sinopse"
                                        id="sinopse"
                                        type="text"
                                        placeholder="Digite uma pequena sinopse para o filme"
                                        value={filmeState.sinopse}
                                        onChange={handleChange}
                                        error={erros.sinopse}
                                    />
                                    <Select
                                        id="classificacaoIndicativa"
                                        name="classificacaoIndicativa"
                                        label="Classificação Indicativa"
                                        value={filmeState.classificacaoIndicativa}
                                        options={opcoesClassificacao}
                                        onChange={(e) => setFilmeState({ ...filmeState, classificacaoIndicativa: e.target.value })}
                                        error={erros.classificacaoIndicativa}
                                    />
                                    <Input
                                        name="duracao"
                                        id="duracao"
                                        type="number"
                                        placeholder="Digite a duração do filme em minutos"
                                        value={filmeState.duracao === 0 ? '' : filmeState.duracao}
                                        onChange={(e) => setFilmeState({...filmeState,duracao: Number(e.target.value)})}
                                        error={erros.duracao}
                                    />
                                    <Input
                                        name="elenco"
                                        id="elenco"
                                        type="text"
                                        placeholder="Digite o elenco do filme"
                                        value={filmeState.elenco}
                                        onChange={handleChange}
                                        error={erros.elenco}
                                    />
                                    <Select
                                        id="genero"
                                        name="genero"
                                        label="Gênero do Filme"
                                        value={filmeState.genero}
                                        options={opcoesGenero}
                                        onChange={(e) => setFilmeState({ ...filmeState, genero: e.target.value })}
                                        error={erros.genero}
                                    />
                                    <Input
                                        name="dataInicialExibicao"
                                        id="Data Inicial de Exibição"
                                        type="date"
                                        placeholder=""
                                        value={filmeState.dataInicialExibicao}
                                        onChange={handleChange}
                                        error={erros.dataInicialExibicao}
                                    />
                                    <Input
                                        name="dataFinalExibicao"
                                        id="Data Final de Exibição"
                                        type="date"
                                        placeholder=""
                                        value={filmeState.dataFinalExibicao}
                                        onChange={handleChange}
                                        error={erros.dataFinalExibicao}
                                    />
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
                                        label={filmeState.id ? "Atualizar" : "Salvar"}
                                        value={filmeState.id ? "Atualizar" : "Salvar"}
                                        variant={filmeState.id ? "warning" : "primary"}
                                        type="submit"
                                        onClick={() => { onSave(filmeState) }}
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
