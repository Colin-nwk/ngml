import { render } from '@testing-library/react';
import ContentContainer from './ContentContainer';

describe('<ContentContainer />', () => {
  it('renders with default props', () => {
    const { container, getByText } = render(<ContentContainer>Test Content</ContentContainer>);

    // Check for default styles
    expect(container.firstChild).toHaveStyle({
      width: '560px',
      height: '100%',
      borderRadius: '5px',
    });

    // Check for the presence of specific content
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with specified props', () => {
    const { container, getByText } = render(
      <ContentContainer type="translucent" width="200px" height="150px" borderRadius={10}>
        Test Content
      </ContentContainer>
    );

    // Check for specified styles
    expect(container.firstChild).toHaveStyle({
      width: '200px',
      height: '150px',
      borderRadius: '10px',
    });

    // Check for the presence of specific content
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});