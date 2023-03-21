import styled from "styled-components";

const TableHolder = styled.div`
  width: 100%;

  table {
    border: 1px solid;
    width: 100%;
    border-collapse: collapse;
    border: 0px;

    thead {
      color: black;
      border-radius: 5px 5px 0px 0px;
      font-weight: 600;
      border: 1px solid #e4e4e4;
      border-top: 0px;
    }

    tr {
      border: 1px solid #e4e4e4;
      border-top: 0px;

      :last-of-type {
        border-bottom: 1px solid #d6d6d6;
      }
    }

    tbody {
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

const ActionsHolder = styled.div`
  display: flex;
`;

export { TableHolder, ActionsHolder };
