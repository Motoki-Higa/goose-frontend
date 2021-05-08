import styled from 'styled-components';

const ScFollowBtn = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  /* font-weight: 500; */
  width: 100%;
  letter-spacing: 0.05rem;
  text-align: center;
  color: ${ props => props.theme.colors.darkGrey };
  margin-top: 8px;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: ${ props => props.theme.colors.lightGrey };
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }

  &.following {
    color: white;
    background-color: ${ props => props.theme.colors.blue };
  }
`;

export {
  ScFollowBtn
}