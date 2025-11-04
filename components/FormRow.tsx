import { ChangeEvent } from 'react';

type FormRowType = {
  labelText?: string;
  name?: string;
  type: string;
  required?: boolean;
  min?: number;
  extraStyle?: string;
  value?: string | number;
  maxLength?: number;
  minLength?: number;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onClick?: () => void;
};

const FormRow = ({
  labelText,
  name,
  type,
  required,
  min,
  extraStyle,
  value,
  maxLength,
  minLength,
  defaultValue,
  onChange,
  readOnly,
  onClick,
}: FormRowType) => {
  return (
    <div className='w-full mt-2 text-xs md:text-sm lg:text-base'>
      <label htmlFor={name} className='capitalize block'>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        min={min}
        required={required}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        defaultValue={defaultValue}
        className={`border border-[var(--primary)]  w-full rounded p-2 mt-1 outline-0 ${extraStyle}`}
        onChange={onChange}
        readOnly={readOnly}
        onClick={onClick}
      />
    </div>
  );
};

export default FormRow;
