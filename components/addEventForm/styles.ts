/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Form, FormGroup } from 'reactstrap';
import * as colors from '../../global/colors';

export const AddEventForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 100%;
  padding: 20px;

  transform-origin: right;
  transition: all 0.2s ease-in-out;

  background-color: #35dc9b;
  color: ${colors.TEXT_LIGHT};

  input,
  textarea {
    width: 300px;
  }

  textarea {
    height: 50px;
  }
`;

export const Heading = styled.h1`
  text-transform: uppercase;
`;

export const Group = styled(FormGroup)`
  margin-bottom: 16px;
`;
