import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the ClassifyAI home page', () => {
    render(<App />);
    const getStartedLink = screen.getByText(/get started/i);
    expect(getStartedLink).toBeInTheDocument();
});
