import styled from "styled-components";

interface PageHolderProps {
  empty: boolean;
}

const PageHolder = styled.main<PageHolderProps>`
  width: 100%;
  height: ${(props) => (props.empty ? "calc(100vh - 130px)" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  margin-top: ${(props) => (props.empty ? "0px" : "50px")};
  padding: 20px 0px;
`;

const NoCompanies = styled.p`
  font-size: 65px;
  width: 50%;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const AddCompanyButtonHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;

const TableAndPaginationHolder = styled.div`
  width: 90%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow: hidden;
`;

export {
  PageHolder,
  NoCompanies,
  AddCompanyButtonHolder,
  TableAndPaginationHolder,
};
