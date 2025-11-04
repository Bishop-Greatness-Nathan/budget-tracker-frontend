'use client';
import { ChangeEvent, useState } from 'react';

function PasswordInput({
  input,
  container,
  name,
  value,
  onChange,
}: {
  input?: string;
  container?: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex justify-center items-center w-full border border-[var(--primary)] mb-1 ${container}`}
    >
      <input
        type={showPassword ? 'text' : 'password'}
        className={`w-[85%] ${input} outline-none`}
        required
        name={name}
        value={value}
        onChange={onChange}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='w-[15%] border-none outline-none flex justify-center items-center'
      >
        {showPassword ? 'hide' : 'show'}
      </button>
    </div>
  );
}

export default PasswordInput;
