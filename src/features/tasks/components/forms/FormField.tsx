interface FormFieldProps {
  className?: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  type?: string;
  min?: number;
}

export default function FormField({
  className,
  type = 'text',
  label,
  value,
  onChange,
  ref,
  min,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-muted-foreground text-[13px]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-background rounded-md w-full px-3 py-2 border border-border"
        ref={ref}
        min={min}
      />
    </div>
  );
}
