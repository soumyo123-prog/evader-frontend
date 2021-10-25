import styled from 'styled-components';
import * as colors from '../../global/colors';

export const TD = styled.td`
  vertical-align: center;
  padding: 0.5rem;
  text-align: center;
`;

export const TH = styled.th`
  vertical-align: center;
  padding: 0.5rem;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #f2f2f2;

  border: 2px solid #cfcfcf;
  outline: none;
  min-width: 300px;
  width: 60%;

  padding: 0.5rem;
  border-radius: 5px;

  &:focus {
    border: 2px solid #a6a6a6;
  }
`;

export const Textarea = styled.textarea`
  background-color: #f2f2f2;

  border: 2px solid #cfcfcf;
  outline: none;
  min-width: 300px;
  min-height: 200px;
  width: 60%;

  padding: 0.5rem;
  border-radius: 5px;

  &:focus {
    border: 2px solid #a6a6a6;
  }
`;

export const Confirmation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
