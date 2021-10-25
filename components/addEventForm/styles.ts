/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import * as colors from '../../global/colors';

export const AddEventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 100%;
  padding: 20px;

  input,
  textarea {
    background-color: #f2f2f2;

    border: 2px solid #cfcfcf;
    outline: none;
    min-width: 300px;
    width: 60%;

    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 5px;

    &:focus {
      border: 2px solid #a6a6a6;
    }
  }

  button {
    margin-top: 1rem;
  }
`;

export const Heading = styled.h2`
  margin-bottom: 2rem;
  text-transform: capitalize;
  color: ${colors.BG_PRIMARY};
`;
