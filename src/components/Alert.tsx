import { Check } from 'lucide-react';
import Card from './Card/Card';
import { motion } from 'motion/react';

interface AlertProps {
  message: string;
}

const MotionCard = motion.create(Card);

export default function Alert({ message }: AlertProps) {
  return (
    <MotionCard
      className="absolute bottom-6 right-6 gap-2"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -60 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="bg-secondary-foreground flex items-center justify-center text-background p-0.5 rounded-full">
        <Check className="w-3 h-3" />
      </div>
      <p className="font-semibold">{message}</p>
    </MotionCard>
  );
}
