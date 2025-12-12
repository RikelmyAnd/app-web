
interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    id: string;
    name: string;
    label: string;
    value: string | number;
    options: SelectOption[];
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({ id, name, label, value, options, error, onChange }: SelectProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <select
                className={`form-control ${error ? 'is-invalid' : ''}`} // Adiciona vermelho se tiver erro
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled>Selecione uma opção...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};