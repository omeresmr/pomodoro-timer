interface FormFieldProps {
  className?: string;
  type?: string;
  label: string;
}

export default function FormField({
  className,
  type = 'text',
  label,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-muted-foreground text-[13px]">{label}</label>
      <input
        type={type}
        className="bg-background rounded-md w-full px-3 py-2 border border-border"
      />
    </div>
  );
}
