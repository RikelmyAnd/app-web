import type React from "react";

interface InputProps {
  id: string;
  name?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio' | 'date' | 'datetime-local';
  placeholder?: string;
  value?: string | number;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const idCaptalized = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

export const Input = ({ id, name, type = 'text', placeholder = '', value, onChange }: InputProps) => {
  return (
    <>
      <div>
        <label htmlFor={id} className="form-label">{idCaptalized(id)}</label>
        <input
          id={id}
          name={name ? name : id}
          className="form-control"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </div>
    </>
  );
}