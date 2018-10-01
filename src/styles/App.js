import styled from 'styled-components';

export const theme = {
  backgroundColor: '#6495ED',
  selectColor: 'blue',
  fontSize: '14px',
  primaryColor: 'black',
  rowsColor: '#1E90FF',
  color: 'white',
  height: '30px',
  border: '1px solid black',
  pointer: 'pointer',
  margin: '50px'
};

export const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr 480px 1fr;
  grid-row-gap: 1em;
  grid-template-areas:
    '. game .'
    '. result .';
`;
export const Span = styled.span`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export const Game = styled.div`
  grid-area: game;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1em;
  grid-template-areas:
    'navigation navigation navigation navigation'
    'field field field field'
    'dice dice dice button';
`;

export const Navigation = styled.div`
  grid-area: navigation;
  margin-top: 10px;
`;

export const Results = styled.div`
  grid-area: result;
`;
