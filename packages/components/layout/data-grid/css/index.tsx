'use client';

import { forwardRef, TableHTMLAttributes } from 'react';
import styles from './data-grid.module.css';

export interface DataGridColumn<T> {
  key: keyof T;
  header: string;
  width?: string;
}

export interface DataGridProps<T extends Record<string, unknown>> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  /** Column definitions */
  columns: DataGridColumn<T>[];
  /** Data rows */
  data: T[];
  /** Color variant */
  variant?: 'cyan' | 'green' | 'amber';
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
}

function DataGridInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    variant = 'cyan',
    striped = true,
    hoverable = true,
    className,
    ...props
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <div className={`${styles.container} ${styles[variant]} ${className || ''}`}>
      <table ref={ref} className={styles.table} {...props}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                className={styles.header}
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
              className={`${styles.row} ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''}`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className={styles.cell}>
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
