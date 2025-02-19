import { cn } from '@/Utils/cn';
import { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import 'react-multi-date-picker/styles/layouts/mobile.css';

interface CustomDatePickerProps {
  range?: boolean;
  onChange: (date: DateObject | DateObject[] | null) => void;
  placeholder?: string;
  className?: string;
  value?: DateObject | DateObject[] | null;
  format?: string;
  disabled?: boolean;
}

const CustomDatePicker = ({
  range = false,
  onChange,
  placeholder = 'Select date',
  className = '',
  value = null,
  format = 'MM/DD/YYYY',
  disabled = false,
}: CustomDatePickerProps) => {
  const [, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="flex h-10 w-full rounded-lg border-[1.5px] border-input bg-background px-3 py-2 text-sm 
          ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-light-green 
          disabled:cursor-not-allowed disabled:opacity-50">
        <DatePicker
          value={value}
          onChange={onChange}
          range={range}
          format={format}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(`
          w-full p-2
                    focus:ring-2 focus:ring-green-500 focus:border-green-500
          disabled:bg-gray-100 disabled:cursor-not-allowed text-sm green`, className)
          }
          containerClassName="w-full"
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          calendarPosition="top-right"


          render={<InputIcon />}

          plugins={[
            <DatePanel />
          ]}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;

