import { useState } from "react";
import type { ISessao } from "../../../models/sessao.model";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";


interface SessoesCadastro {
    key?: string;
    sessao: ISessao | null;
    onSave: (sessao: ISessao) => void;
    onCancel: () => void;
    erros?: Record<string, string>;
}

export const SessoesCadastro = ({ sessao, onSave, onCancel, erros = {} }: SessoesCadastro) => {
    const [sessaoState, setSessaoState] = useState<ISessao>(sessao || { id: '', horario: '', salaId: '', filmeId: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSessaoState({ ...sessaoState, [name]: value });
    }

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
