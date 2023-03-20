import styled from "styled-components";

const PageHolder = styled.main`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export { PageHolder, NoCompanies, AddCompanyButtonHolder };
