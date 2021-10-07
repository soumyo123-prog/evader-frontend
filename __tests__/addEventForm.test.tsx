import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import AddEventForm from '../components/addEventForm/addEventForm';

describe('Add event form', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<AddEventForm />);
  });

  it('should render the form correctly', () => {
    expect(component.getByText('add event')).toBeInTheDocument();
  });

  it('should render disabled submit button when all input fields are not valid', () => {
    let submitButton = component.getByTestId('add-event-form-submit-button');

    // It is disabled at first
    expect(submitButton).toBeDisabled();

    // Calling all the input fields
    const nameInput = component.getByTestId('add-event-form-name-input');
    const descriptionInput = component.getByTestId(
      'add-event-form-description-input'
    );
    const venueInput = component.getByTestId('add-event-form-venue-input');
    const dateInput = component.getByTestId('add-event-form-date-input');
    const timeInput = component.getByTestId('add-event-form-time-input');

    const dateValue = new Date(new Date().getTime() + 60000 * 30);

    // Adding all valid values and triggering change
    act(() => {
      fireEvent.change(nameInput, {
        target: { value: 'test event' },
      });
      fireEvent.change(descriptionInput, {
        target: { value: 'this is just a test event' },
      });
      fireEvent.change(venueInput, {
        target: { value: 'Lajpat Nagar, New Delhi, India' },
      });
      fireEvent.change(dateInput, {
        target: { value: dateValue.toISOString().substr(0, 10) },
      });
      fireEvent.change(timeInput, {
        target: { value: dateValue.toISOString().substr(11, 5) },
      });
    });

    // Now the create button should not be disabled
    expect(submitButton).not.toBeDisabled();
  });
});
