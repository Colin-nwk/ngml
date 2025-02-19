import { render } from '@testing-library/react';
import DailyFrequencyTable from './DailyFrequencyTable';

describe('DailyFrequencyTable', () => {
   it('renders without crashing', () => {
      const { getByTestId } = render(<DailyFrequencyTable />);
      const dataGrid = getByTestId('data-grid');
      expect(dataGrid).toBeInTheDocument();
   });
});
