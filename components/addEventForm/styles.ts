/* eslint-disable import/prefer-default-export */
import { Label } from 'reactstrap';
import styled from 'styled-components';
import * as colors from '../../global/colors';

interface LabelProps {
  show: string;
}

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

    padding: 0.5rem;
    border-radius: 5px;

    &:focus {
      border: 2px solid #a6a6a6;
    }
  }

  div {
    min-width: 300px;
    margin-bottom: 0.8rem;
    width: 60%;
    color: ${colors.DANGER};
  }

  button {
    margin-top: 1rem;
  }
`;

export const Heading = styled.h2`
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: ${colors.BG_PRIMARY};
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
