/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Card, CardImg, CardBody, CardText, Button } from 'reactstrap';
import * as colors from '../../global/colors';

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  height: 100%;

  position: relative;
`;

export const Delete = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 50;
`;

export const ImageContainer = styled.div`
  height: 150px;
  width: 150px;
  padding: 10px;
  overflow: hidden;
  background-color: #e6e6e6;
  border-radius: 50%;

  display: flex;
  justify-content: center;
`;

export const CardImage = styled(CardImg)`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const CardDetails = styled(CardBody)`
  width: 90%;
  p {
    svg {
      margin-right: 10px;
    }
  }
`;

export const Title = styled.h5`
  display: flex;
  justify-content: center;
  text-transform: capitalize;
`;

export const Description = styled(CardText)`
  display: flex;
  justify-content: center;
`;

export const Venue = styled(CardText)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.INFO};
`;

export const DateTime = styled(CardText)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.BG_DARK};
`;
