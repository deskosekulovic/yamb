import styled from 'styled-components';

const StyledTopList = styled.div`
  margin: ${(props) => props.center && props.theme.centering};
  background-color: ${(props) => props.theme.gameBackground};
  width: ${(props) => props.center && '40%'};
  min-width: 500px;
  min-height: 300px;
  padding: 10px;
`;
export const TopListSettings = styled.div`
  float: left;
  padding-right: 50px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 20px;
  th, td {
    border: ${(props) => props.theme.border};
    border-collapse: collapse;
    padding: 10px;
    background-color: ${(props) => props.theme.color};
  }
`;

export default StyledTopList;
