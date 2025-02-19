import { render } from '@testing-library/react';
import StatisticDynamicCardTwo from './StatisticDynamicCardTwo';

describe('StatisticDynamicCardTwo', () => {
  test('renders with required props', () => {
    const icon = <svg />;
    const value = 100;
    const { getByText } = render(
      <StatisticDynamicCardTwo
        type="primary"
        icon={icon}
        value={value}
      />
    );
    expect(getByText(value.toString())).toBeInTheDocument();
  });

  test('renders with all props', () => {
    const icon = <svg />;
    const value = 100;
    const content = 'Content';
    const subcontent = 'Subcontent';
    const yearOptions = [2022, 2023, 2024];
    const className = 'custom-class';
    const contentColor = 'red';
    const subcontentColor = 'blue';
    const valueColor = 'green';
    const iconColor = 'yellow';
    const yearColor = 'orange';

    const { getByText } = render(
      <StatisticDynamicCardTwo
        type="secondary"
        icon={icon}
        value={value}
        content={content}
        subcontent={subcontent}
        yearOptions={yearOptions}
        className={className}
        contentColor={contentColor}
        subcontentColor={subcontentColor}
        valueColor={valueColor}
        iconColor={iconColor}
        yearColor={yearColor}
      />
    );

    expect(getByText(value.toString())).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
    expect(getByText(subcontent)).toBeInTheDocument();
  });
});