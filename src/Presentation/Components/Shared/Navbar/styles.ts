import styled from "styled-components";

const NavbarHolder = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CompanyDropdown = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 25px;
  position: relative;
`;

const CompanyName = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-left: 30px;
`;

const UserDropdown = styled.div`
  width: 12%;
  height: 100%;
  background-color: #eaeaea;
  border: 0px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const Logout = styled.button`
  position: absolute;
  bottom: -40px;
  left: 0;
  border: 0px;
  width: 100%;
  height: 40px;
  background-color: #eaeaea;
  display: ${(props: { visible: boolean }) =>
    props.visible ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #0385fd;
`;

const UserName = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export {
  NavbarHolder,
  CompanyDropdown,
  CompanyName,
  UserDropdown,
  UserImage,
  UserName,
  Logout,
};
