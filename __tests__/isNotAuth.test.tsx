import React from 'react';
import { render, screen } from '@testing-library/react';
import IsNotAuth from '../components/home/isNotAuth';
import { AuthContext } from '../context/auth';
import { userProfileType } from '../types/types';

describe('Home component (not authenticated)', () => {
  it('should load the component', () => {
    render(<IsNotAuth />);
    expect(screen.getByText('Evader')).toBeInTheDocument();
    expect(
      screen.getByText('the all in one events management platform')
    ).toBeInTheDocument();
    screen.debug();
  });

  it('should show toast when there is error while authenticating', () => {
    let { container } = render(
      <AuthContext.Provider
        value={{
          fireUser: null,
          errorToast: true,
          token: null,
          backendUser: {} as userProfileType,
          signInHandler: () => {},
          signOutHandler: () => {},
          setFireUser: () => {},
          setErrorToast: () => {},
          setToken: () => {},
          setBackendUser: () => {},
        }}
      >
        <IsNotAuth />
      </AuthContext.Provider>
    );
    expect(container.firstChild?.lastChild).toHaveClass('Toastify');
    screen.debug();
  });
});

export {};
