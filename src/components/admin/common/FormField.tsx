import React from 'react';

interface FormFieldProps {
  label: string;
  name?: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'select' | 'switch' | 'tags';
  value: any;
  onChange: (val: any) => void;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  helperText?: string;
  error?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
  helperText,
  error,
  rows = 3,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`w-full px-3 py-2 bg-white border ${
            error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#0F4C5C]'
          } rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 disabled:bg-slate-50`}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3 py-2 bg-white border ${
            error ? 'border-red-400' : 'border-slate-300 focus:border-[#0F4C5C]'
          } rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 cursor-pointer disabled:bg-slate-50`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'switch' ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F4C5C]"></div>
          <span className="ml-2 text-xs font-semibold text-slate-600">
            {value ? 'Active / Visible' : 'Inactive / Hidden'}
          </span>
        </label>
      ) : type === 'tags' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : value ?? ''}
            onChange={(e) => {
              const tags = e.target.value.split(',').map((t) => t.trim());
              onChange(tags);
            }}
            placeholder={placeholder || 'Enter comma-separated items (e.g. 5-ply, Kraft, Rigid)'}
            disabled={disabled}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C]"
          />
          {Array.isArray(value) && value.length > 0 && value[0] !== '' && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {value.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 bg-white border ${
            error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#0F4C5C]'
          } rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 disabled:bg-slate-50`}
        />
      )}

      {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
    </div>
  );
};
