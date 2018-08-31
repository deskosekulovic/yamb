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
    border: '1px solid black',
    pointer: 'pointer',
    centering: '0 auto',
    margin: '50px'
};

export const StyledApp = styled.div`
  margin: ${(props) => props.theme.centering};
  width: 900px;
`;
export const Span = styled.span`
  text-decoration: underline;
  padding: 5px;
  &:hover {
  cursor: pointer;
  }
`;

export const Game = styled.div`
  float: left;
  padding: 5px 30px;
  background-color: ${(props) => props.theme.gameBackground};
`;

export const Rezultati = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.gameBackground};
  height: 630px;
`;
