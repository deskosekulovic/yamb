import styled from 'styled-components';

const StyledButton = styled.button`
  grid-area: button;
  height: 50px;
  width: 90px;
  color: ${props => props.theme.color};
  background-color: ${props =>
    props.disabled ? 'red' : props.theme.backgroundColor};
  &:hover {
    cursor: ${props => props.theme.pointer};
  }
`;

export default StyledButton;
