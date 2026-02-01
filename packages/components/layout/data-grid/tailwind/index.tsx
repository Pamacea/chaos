'use client';

import { forwardRef, TableHTMLAttributes } from 'react';

export interface DataGridColumn<T> {
  key: keyof T;
  header: string;
  width?: string;
}

export interface DataGridProps<T extends Record<string, unknown>> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: DataGridColumn<T>[];
  data: T[];
  variant?: 'cyan' | 'green' | 'amber';
  striped?: boolean;
  hoverable?: boolean;
}

const variantStyles = {
  cyan: { border: 'border-cyan-400', header: 'text-cyan-400 bg-cyan-400/10', hover: 'hover:bg-cyan-400/10' },
  green: { border: 'border-emerald-400', header: 'text-emerald-400 bg-emerald-400/10', hover: 'hover:bg-emerald-400/10' },
  amber: { border: 'border-amber-400', header: 'text-amber-400 bg-amber-400/10', hover: 'hover:bg-amber-400/10' },
};

function DataGridInner<T extends Record<string, unknown>>(
  { columns, data, variant = 'cyan', striped = true, hoverable = true, className = '', ...props }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  const colors = variantStyles[variant];
  
  return (
    <div className={`w-full font-['Share_Tech_Mono',monospace] bg-black/50 border ${colors.border} overflow-hidden ${className}`}>
      <table ref={ref} className="w-full border-collapse" {...props}>
        <thead>
          <tr className={`${colors.header} border-b ${colors.border}`}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`
                border-b border-white/5 transition-colors duration-200
                ${striped && i % 2 === 1 ? 'bg-white/[0.02]' : ''}
                ${hoverable ? colors.hover : ''}
              `}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2.5 text-[13px] text-white/80">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DataGrid = forwardRef(DataGridInner) as <T extends Record<string, unknown>>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => JSX.Element;

export default DataGrid;
