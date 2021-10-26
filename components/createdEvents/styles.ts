import styled from 'styled-components';
import { Col } from 'reactstrap';

export const Column = styled(Col)`
  padding: 10px;
  min-width: 300px;
  a {
    height: 100%;
  }
`;

export const EventLink = styled.a`
  display: block;
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
