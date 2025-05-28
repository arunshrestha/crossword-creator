import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Shared/Button';

test('renders button and handles click', () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Click Me</Button>);

    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
});
