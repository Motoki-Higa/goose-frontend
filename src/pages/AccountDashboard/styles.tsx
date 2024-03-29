import styled, { keyframes } from 'styled-components';

const keyFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const ScProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 12px auto 0;
  animation: ${ keyFadeIn } 0.5s ease-in;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2px;
  }
`;

const ScLeftColumn = styled.div`
  /* width: 125px; */
  /* height: 125px; */

  @media (max-width: 768px) {
    /* width: 80px; */
    /* height: 80px; */
  }
`;

const ScProfileImg = styled.div`
  display: flex;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: ${ props => props.theme.colors.lightGrey};

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ScProfileTxtArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: calc(100% - 125px);
  padding: 12px 0 12px 24px;

  @media (max-width: 768px) {
    width: calc(100% - 80px);
  }
`;

const ScProfileName = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScProfileBio = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.5;
  margin-top: 12px;
  color: ${ props => props.theme.colors.black };

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ScProfileWebsite = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.5;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  a {
    color: ${ props => props.theme.colors.blue };
  }
`;

const ScSubNav = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.5;
  margin-top: 24px;
  padding: 12px 0;
  animation: ${ keyFadeIn } 0.5s ease-in;
  border-bottom: 1px solid ${ props => props.theme.colors.lightGrey };

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 12px;
  }

  a {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    color: ${ props => props.theme.colors.black };
    text-decoration: none;

    :hover {
      color: ${ props => props.theme.colors.pink };
    }

    &.active {
      color: ${ props => props.theme.colors.blue };
    }
  }

  p {
    display: inline-block;
    font-size: 0.75rem;
    margin-left: 6px;
  }
`;

export {
  ScProfile,
  ScLeftColumn,
  ScProfileImg,
  ScProfileTxtArea,
  ScProfileName,
  ScProfileBio,
  ScProfileWebsite,
  ScSubNav
}