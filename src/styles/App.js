import styled from 'styled-components';

export const theme = {
    backgroundColor: '#6495ED',
    selectColor: 'blue',
    gameBackground: '#DCDCDC',
    fontSize: '14px',
    primaryColor: 'black',
    rowsColor: '#1E90FF',
    color: 'white',
    height: '30px',
    border: '1px solid black'
};

export const StyledApp = styled.div`
  margin: 0 auto;
  width: 900px;
`;
export const Span = styled.span`
  text-decoration: underline;
  &:hover {
  cursor: pointer;
  }
`;

export const ColumnName = styled.div`
  font-weight: bold;
  margin-top: 20px;
`;
export const Game = styled.div`
  float: left;
  padding: 30px;
  background-color: ${(props) => props.theme.gameBackground};
`;

export const RowName = styled.button`
  border: ${(props) => props.theme.border};
  width: 60px;
  height: ${(props) => props.theme.height};
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.rowsColor};
`;

export const StyledField = styled.button`
  border: ${(props) => props.theme.border};
  width: 60px;
  height: 30px;
  text-align: center;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.permission ? props.theme.selectColor : props.theme.backgroundColor};
`;

export const Rezultati = styled.div`
  padding: 30px;
  background-color: ${(props) => props.theme.gameBackground};
  height: 700px
`;
