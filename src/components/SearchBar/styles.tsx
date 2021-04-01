import styled from 'styled-components';
import { Search } from '@material-ui/icons';

const ScSearchBarWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    font-size: 1rem;
    letter-spacing: 0.025rem;
    color: transparent;
    width: 30px;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;

    /* &:-internal-autofill-selected, */
    &:-webkit-autofill {
      padding: 6px 15px;
      -webkit-text-fill-color: ${ props => props.theme.colors.pink }!important;
      -webkit-box-shadow: 0 0 0px 1000px ${ props => props.theme.colors.midGrey } inset !important;
      box-shadow: 0 0 0px 1000px ${ props => props.theme.colors.midGrey } inset !important;
    }
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${ props => props.theme.colors.pink }!important;
      -webkit-box-shadow: 0 0 0px 1000px ${ props => props.theme.colors.midGrey } inset !important;
      box-shadow: 0 0 0px 1000px ${ props => props.theme.colors.midGrey } inset !important;
    }

    &:focus {
      color: ${ props => props.theme.colors.pink };
      width: 200px;
      padding: 6px 12px 6px 30px;
      background-color: ${ props => props.theme.colors.midGrey };
    }
  }
`;

const ScSearch = styled(Search)`
  position: absolute;
  font-size: 1.25rem !important;
  color: ${ props => props.theme.colors.black };
  margin-left: 6px;
  pointer-events: none;
`;

export {
  ScSearchBarWrap,
  ScSearch
}