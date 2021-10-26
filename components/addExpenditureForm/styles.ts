import { Button } from 'reactstrap';
import styled from 'styled-components';
import * as colors from '../../global/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

export const Input = styled.input`
  background-color: #f2f2f2;
  border: 2px solid #cfcfcf;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  outline: none;
  min-width: 300px;
  width: 50%;

  &:focus {
    border: 2px solid #a6a6a6;
  }
`;

export const Heading = styled.h3`
  color: ${colors.BG_PRIMARY};
  margin-bottom: 3rem;
`;

export const Submit = styled(Button)`
  margin-top: 2rem;
`;
