interface ButtonProps {
  value: string;
  type?: 'button' | 'submit' | 'reset';
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({value, type = 'button', label, variant = 'primary',disabled, onClick }: ButtonProps) => {
  return (
    <>  
    <button className = {"btn btn-" + variant} type={type} onClick={onClick} disabled={disabled}>
        {label}
    </button>

    </>
  );
}  
