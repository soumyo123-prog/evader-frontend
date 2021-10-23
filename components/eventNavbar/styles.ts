/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import * as colors from '../../global/colors';

interface ExpandedProps {
  expand: boolean;
}

interface HamburgerProps {
  expand: boolean;
}

export const EventNavbarContainer = styled.nav`
  height: 50px;
  background-color: #e6e6e6;

  ul {
    display: flex;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;

    li {
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export const Active = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: auto;
  margin-left: auto;
  letter-spacing: 2px;

  text-transform: uppercase;
  color: ${colors.BG_PRIMARY};
  font-weight: bold;
`;

export const Expanded = styled.div<ExpandedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  z-index: 50;

  width: 100%;
  padding-right: 60px;

  background-color: #e6e6e6;

  transform-origin: top;
  transition: all 0.1s ease-in-out;
  ${(props) =>
    props.expand ? 'transform: scaleY(1);' : 'transform: scaleY(0);'}

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    text-transform: uppercase;
    color: ${colors.BG_PRIMARY};

    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 5px;

    a {
      min-width: 200px;
    }
  }
`;

export const Hamburger = styled.li<HamburgerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    svg {
      path {
        transition: all 0.1s ease-in-out;
        transform-origin: center;
        ${(props) =>
          props.expand
            ? 'transform: rotate(180deg);'
            : 'transform: rotate(0deg);'}
      }
    }
  }
`;
