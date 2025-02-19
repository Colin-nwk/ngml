// components/ChartFilters.tsx
interface SelectDropdownProps {
    options: (string | number)[];
    value: string | number;
    onChange: (value: string | number) => void;
    label?: string;
}

export const SelectDropdown = ({
    options,
    value,
    onChange,
    label
}: SelectDropdownProps) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500 sr-only">{label}</label>
        <select
            aria-label={label}
            className="rounded-lg border border-gray-200 py-2.5 px-3 text-sm font-medium text-gray-600 
        focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-200 
        transition-all duration-200 hover:border-primary-200 bg-white shadow-sm min-w-[120px]"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

interface FilterRadioGroupProps {
    filterType: 'month' | 'year';
    onChange: (type: 'month' | 'year') => void;
}

export const FilterRadioGroup = ({ filterType, onChange }: FilterRadioGroupProps) => (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
        {(['month', 'year'] as const).map((type) => (
            <button
                key={type}
                onClick={() => onChange(type)}
                className={`px-4 capitalize py-2 text-sm font-medium rounded-md transition-all duration-200
          ${filterType === type
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
            >
                {type === 'year' ? 'month' : 'daily'}
                {/* {type.charAt(0).toUpperCase() + type.slice(1)} */}
            </button>
        ))}
    </div>
);