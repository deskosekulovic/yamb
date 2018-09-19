import styled from 'styled-components';

const StyledTopList = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.gameBackground};
`;
export const StyledTopListSettings = styled.div`
  position: absolute;
  width: 100%;
`;

export const Settings = styled.div`
  background: ${(props) => props.theme.backgroundColor};
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledDisplayTopList = styled.div`
  padding-top: 60px;
  padding-bottom: 20px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: 20px auto;
  th, td {
    border: ${(props) => props.theme.border};
    border-collapse: collapse;
    padding: 10px;
    background-color: ${(props) => props.theme.color};
  }
`;

export default StyledTopList;
