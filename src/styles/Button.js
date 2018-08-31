import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  width: 90px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  margin-left: 50px;
  &:hover {
    cursor: ${(props) => props.theme.pointer};
  }
`;

export default Button;
