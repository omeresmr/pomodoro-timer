import { Check } from 'lucide-react';

export default function CheckBox() {
  return (
    <label className="flex gap-2 relative">
      <input type="checkbox" name="task-status" className="hidden peer" />
      <div className="task-checkbox group">
        <Check className="p-px duration-500 opacity-0 group-peer-checked:opacity-100 text-chart-4" />
      </div>
    </label>
  );
}
