import styled from "styled-components";

const TableHolder = styled.div`
  width: 90%;

  table {
    border: 1px solid;
    width: 100%;
    margin-top: 25px;
    border-collapse: collapse;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    thead {
      color: black;
      border-radius: 5px 5px 0px 0px;
      font-weight: 600;
      border-bottom: 1px solid #e4e4e4;
    }

    tr {
      border-bottom: 1px solid #e4e4e4;
    }

    tbody {
      border-radius: 0px 0px 5px 5px;
      border-bottom: 1px solid #e4e4e4;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-align: center;
      height: 50px;
      text-align: start;
      padding-left: 30px;
      vertical-align: middle;
    }
  }
`;

export { TableHolder };
