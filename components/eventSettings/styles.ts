import { Label } from 'reactstrap';
import styled from 'styled-components';
import * as colors from '../../global/colors';

interface LabelProps {
  show: string;
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

export const LabelInput = styled(Label)<LabelProps>`
  width: 60%;
  min-width: 300px;

  color: ${colors.BG_PRIMARY};
  font-size: 1.1rem;
  transition: all 0.1s ease-in-out;

  ${(props) =>
    props.show
      ? 'transform: translateY(0) scaleY(1);'
      : 'transform: translateY(100%) scaleY(0);'}
`;

export const Input = styled.input`
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
`;

export const Textarea = styled.textarea`
  background-color: #f2f2f2;

  border: 2px solid #cfcfcf;
  outline: none;
  min-width: 300px;
  min-height: 200px;
  width: 60%;
  margin-bottom: 1rem;

  padding: 0.5rem;
  border-radius: 5px;

  &:focus {
    border: 2px solid #a6a6a6;
  }
`;

export const Confirmation = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 60%;
`;
