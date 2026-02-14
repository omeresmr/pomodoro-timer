interface IconProps {
  children: React.ReactNode;
  className: string;
}

export default function Icon({ children, className }: IconProps) {
  return (
    <div className={`${className} flex items-center justify-center rounded-md`}>
      {children}
    </div>
  );
}
