import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Shared/Button';

test('renders Button with text', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByText(/click me/i);
    expect(btn).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText(/click/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
