import styled from 'styled-components';
import { Search } from '@material-ui/icons';

const ScSearchBarWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 12px;

  input {
    font-size: 0.875rem;
    color: transparent;
    width: 30px;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      color: ${ props => props.theme.colors.black };
      width: 200px;
      padding: 6px 12px 6px 30px;
    }
  }
`;

const ScSearch = styled(Search)`
  position: absolute;
  font-size: 1.125rem !important;
  color: ${ props => props.theme.colors.black };
  margin-left: 6px;
  pointer-events: none;
`;

export {
  ScSearchBarWrap,
  ScSearch
}