import React from 'react';
import { render, screen } from '@testing-library/react';
import AddEvent from '../components/addButton/addButton';

describe('Add event form opening button', () => {
  it('should show add icon when the event create form is not opened', () => {
    const component = render(<AddEvent clickHandler={() => {}} open={false} />);
    const addIcon = component.getByTestId('add-event-open-icon');
    expect(addIcon).toBeInTheDocument();
  });

  it('should show close icon when the event create form is opened', () => {
    const component = render(<AddEvent clickHandler={() => {}} open />);
    const closeIcon = component.getByTestId('add-event-close-icon');
    expect(closeIcon).toBeInTheDocument();
  });
});

export {};
