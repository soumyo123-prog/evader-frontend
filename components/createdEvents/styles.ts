import styled from 'styled-components';
import * as colors from '../../global/colors';

export const Heading = styled.th`
  font-weight: normal;
`;

export const Name = styled.td`
  font-size: 1.2rem;

  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;

export const Date = styled.span`
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Time = styled.span`
  white-space: nowrap;
  color: ${colors.TEXT_REDUCED_OPACITY};
`;
