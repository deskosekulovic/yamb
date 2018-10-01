import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: grid;
  grid-template-columns: 1fr 480px 1fr;
  grid-row-gap: 1em;
  h1,
  div,
  a {
    grid-column: 2/3;
    display: grid;
    justify-content: center;
    text-decoration: none;
    h2,
    select {
      justify-self: center;
    }
  }
  background-color: ${props => props.theme.backgroundColor};
  padding: 20px 0;
`;

export const Container = styled.label`
  cursor: pointer;
  font-size: 22px;
  padding-left: 30px;
`;
