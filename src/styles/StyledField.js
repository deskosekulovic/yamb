import styled from 'styled-components';

export const StyledField = styled.button`
  border: ${props => props.theme.border};
  width: 60px;
  height: 30px;
  text-align: center;
  &:hover {
    cursor: ${props => props.permission && props.theme.pointer};
    background-color: ${props =>
    props.permission && props.theme.backgroundColor};
    color: ${props => props.permission && props.theme.color};
  }
  color: ${props => props.theme.color};
  background-color: ${props =>
    props.permission ? props.theme.selectColor : props.theme.backgroundColor};
  background-color: ${props =>
    (props.row.slice(0, 4) === 'suma' || props.row === '') &&
    props.theme.rowsColor};
`;
