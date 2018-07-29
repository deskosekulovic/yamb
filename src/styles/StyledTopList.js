import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  th, td {
    border: ${(props) => props.theme.border};
    border-collapse: collapse;
    padding: 10px;
    background-color: ${(props) => props.theme.color};
  }
`;

export default Table;
