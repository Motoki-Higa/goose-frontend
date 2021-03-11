import styled from 'styled-components';

const ScArrowBackBtnWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${ props => props.theme.colors.black};
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${ props => props.theme.colors.blue};

    svg {
      color: ${ props => props.theme.colors.blue};
    }
  }

  &:focus {
    outline: none;
  }

  svg {
    font-size: 1rem !important;
    transition: all 0.3s ease;
    color: ${ props => props.theme.colors.black};
  }
`;

export {
  ScArrowBackBtnWrap
}