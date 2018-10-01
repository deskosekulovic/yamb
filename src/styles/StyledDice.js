import styled from 'styled-components';

const StyledDice = styled.input`
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 20px;
  background-color: ${props =>
    props.selected ? props.theme.selectColor : 'none'};
  &:hover {
    cursor: ${props => props.theme.pointer};
  }
`;

export default StyledDice;
