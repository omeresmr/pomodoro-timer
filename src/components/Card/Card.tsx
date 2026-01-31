import { forwardRef } from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, children } = props;
  return (
    <div ref={ref} className={`card ${className}`}>
      {children}
    </div>
  );
});

export default Card;
