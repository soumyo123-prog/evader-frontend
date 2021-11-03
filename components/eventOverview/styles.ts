import styled from 'styled-components';
import { Button, Col, Table } from 'reactstrap';
import * as colors from '../../global/colors';

export const Column = styled(Col)`
  padding: 1rem;
`;

export const OverviewTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0.2rem;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

export const OverviewTable = styled(Table)`
  margin-bottom: 0;
  padding: 0.2rem;
`;

export const LocationIcon = styled.td`
  svg {
    color: ${colors.INFO};
  }
`;

export const CalendarIcon = styled.td`
  svg {
    color: ${colors.DANGER};
  }
`;

export const TableButton = styled(Button)`
  margin-left: 0.5rem;
`;

export const OverviewDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.5rem;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
`;

export const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #e6e6e6;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const Name = styled.h5`
  text-transform: capitalize;
  margin-top: 0.5rem;
`;

export const Description = styled.p`
  text-align: center;
  width: 75%;
`;
