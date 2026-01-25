import { Check } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface CheckBoxProps {
  checked: boolean;
  onChange: React.EventHandler<ChangeEvent>;
}

export default function CheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <label className="flex gap-2 relative">
      <input
        type="checkbox"
        name="task-status"
        className="hidden peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="task-checkbox group">
        <Check className="p-px duration-500 opacity-0 group-peer-checked:opacity-100 text-chart-4" />
      </div>
    </label>
  );
}
