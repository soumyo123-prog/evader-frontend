import { Col } from 'reactstrap';
import styled from 'styled-components';

export const CardContainer = styled(Col)`
  padding: 10px;
  min-width: 300px;
  a {
    height: 100%;
  }
`;

export const CardLink = styled.a`
  display: block;
  text-decoration: none;
  color: black;
  &:hover {
    color: black;
  }
`;
