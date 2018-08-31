import styled from 'styled-components';

export const StyledSettings = styled.div`
  margin: 0 auto;
  width: 600px;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 30px;
  text-align: center;
`;

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 250px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  text-align: left;
`;
