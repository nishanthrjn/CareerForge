'use client';

import {
  TextareaHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';
import clsx from 'clsx';

type FieldWrapperProps = {
  label: string;
  helperText?: string;
  children: ReactNode;
};

export function FieldWrapper({ label, helperText, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-slate-200">
        {label}
      </label>
      {children}
      {helperText && (
        <p className="mt-0.5 text-[11px] text-red-300">{helperText}</p>
      )}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

// React Hook Form needs a ref → forward it to the real <input />
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={clsx('mt-1 input-field', className)}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

// Same for <textarea />
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        {...rest}
        className={clsx('mt-1 textarea-field', className)}
      />
    );
  },
);

TextArea.displayName = 'TextArea';
