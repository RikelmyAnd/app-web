import { useState } from "react";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { type ISala } from "../../../models/salas.model";
import { TipoSala } from "../../../models/salas.model";


interface SalasCadastro {
    key?: string;
    sala: ISala | null;
    onSave: (sala: ISala) => void;
    onCancel: () => void;
    erros?: Record<string, string>;
}

export const SalasCadastro = ({ sala, onSave, onCancel, erros = {} }: SalasCadastro) => {
    const [salaState, setSalaState] = useState<ISala>(sala || { id: '', nome: '', numero: 0, capacidade: 0, tipo: '', assento: [[]] });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSalaState({ ...salaState, [name]: value });
    }

    const opcoesTipo = Object.values(TipoSala).map(valor => ({
        value: valor,
        label: valor
    }));

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body bg-light">
                            <h5 className="card-title">Cadastro de Salas</h5>
                            <hr />
                            <div className="container">
                                <form onSubmit={(e) => { e.preventDefault(); onSave(salaState); }} >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Select
                                                label="Escolha o tipo da Sala"
                                                name="tipo"
                                                id="tipo"
                                                value={salaState.tipo}
                                                options={opcoesTipo} // Lista preparada
                                                onChange={(e) => setSalaState({ ...salaState, tipo: e.target.value })}
                                                error={erros.tipo}
                                            />

                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                name="capacidade"
                                                id="capacidade"
                                                type="number"
                                                value={salaState.capacidade === 0 ? '' : salaState.capacidade}
                                                onChange={(e) => setSalaState({
                                                    ...salaState,
                                                    capacidade: Number(e.target.value)
                                                })}
                                                error={erros.capacidade}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                name="numero"
                                                id="numero"
                                                type="number"
                                                value={salaState.numero === 0 ? '' : salaState.numero}
                                                onChange={(e) => setSalaState({
                                                    ...salaState,
                                                    numero: Number(e.target.value)
                                                })}
                                                error={erros.numero}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                name="nome"
                                                id="nome"
                                                type="text"
                                                value={salaState.nome}
                                                onChange={handleChange}
                                                error={erros.nome}
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
                                        label={salaState.id ? "Atualizar" : "Salvar"}
                                        value={salaState.id ? "Atualizar" : "Salvar"}
                                        variant={salaState.id ? "warning" : "primary"}
                                        type="submit"
                                        onClick={() => { onSave(salaState) }}
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
