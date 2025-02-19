import { fireEvent, render } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with label', () => {
    const onClickMock = vitest.fn();
    const { getByText } = render(
      <Button type="primary" label="Click Me" action={onClickMock} />
    );

    const button = getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('calls action prop on button click', () => {
    const onClickMock = vitest.fn();
    const { getByText } = render(
      <Button type="primary" label="Click Me" action={onClickMock} />
    );

    const button = getByText('Click Me');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders button with icon', () => {
    const onClickMock = vitest.fn();
    const { getByAltText } = render(
      <Button type="icon" label="Click Me" action={onClickMock} icon="path/to/icon.png" />
    );

    const icon = getByAltText('icon');
    expect(icon).toBeInTheDocument();
  });



});
