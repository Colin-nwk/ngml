// hooks/useChartFilter.ts
import { useState } from 'react';

export interface FilterParams {
  filterType: 'month' | 'year';
  month?: string;
  year: number;
}

export const useChartFilter = () => {
   const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    filterType: 'year',
    month: months[new Date().getMonth()],
    year: currentYear
  });

 
  const yearsRange = Array.from(
    { length: 10 }, 
    (_, i) => currentYear - i
  );

  const updateFilterType = (type: 'month' | 'year') => {
    setFilterParams(prev => ({
      ...prev,
      filterType: type,
      month: type === 'month' ? months[new Date().getMonth()] : undefined
    }));
  };

  const updateMonth = (month: string) => {
    setFilterParams(prev => ({ ...prev, month }));
  };

  const updateYear = (year: number) => {
    setFilterParams(prev => ({ ...prev, year }));
  };

  return {
    filterParams,
    months,
    yearsRange,
    updateFilterType,
    updateMonth,
    updateYear
  };
};