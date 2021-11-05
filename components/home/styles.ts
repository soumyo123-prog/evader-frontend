import styled from 'styled-components';

export const IsNotAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: auto;
  width: 100%;
  height: 100%;
`;

export const ProjectName = styled.div`
  font-family: 'Chango', sans-serif;
  font-size: 3rem;
  text-transform: uppercase;
  user-select: none;
`;

export const ProjectSlogan = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.1rem;
  text-align: center;
  text-transform: capitalize;
  user-select: none;
`;

export const ButtonContainer = styled.div`
  margin-top: 1.5rem;
`;

export const IsAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  position: relative;

  overflow: auto;
  width: 100%;
`;

export const ImageContainer = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 575px) {
    height: 200px;
    width: 200px;
  }
`;

export const Intro = styled.div`
  font-size: 1.3rem;
  margin-top: 1.5rem;

  @media (max-width: 575px) {
    font-size: 1.1rem;
  }
`;

export const FullName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 575px) {
    font-size: 1.2rem;
  }
`;

export const UsageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;

  width: 100%;
  margin-top: 1.5rem;
`;

export const Usage = styled.div`
  width: 300px;
  font-size: 1.2rem;
  padding: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UsageParam = styled.div`
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 575px) {
    font-size: 1.8rem;
  }
`;
