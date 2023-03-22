import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import UserContext from "@Contexts/User";

import { SelectHolder, SelectOption } from "@Components/Shared/Select";

import UserProfileImage from "@Assets/User.png";

import {
  CompanyDropdown,
  CompanyName,
  Logout,
  NavbarHolder,
  UserDropdown,
  UserImage,
  UserName,
} from "./styles";

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { companyId } = useParams();

  const cookieManager = new JsCookieManager();
  const toaster = new ReactToastifyUserFeedback();

  const username = userContext.name.split(" ")[0];

  const logout = () => {
    userContext.email = "";
    userContext.name = "";
    userContext.token = "";

    cookieManager.deleteCookie("token");
    cookieManager.deleteCookie("name");

    toaster.success("Desconectado com sucesso");

    navigate("/");
  };
  console.log(userContext);
  useEffect(() => {
    if (companyId && !userContext.userCompanies.length) navigate("/companies");
  }, [companyId, navigate, userContext.userCompanies.length]);

  const closeUserDropdown = () => {
    setUserDropdown(false);
    document.body.removeEventListener("click", closeUserDropdown);
  };

  const addUserDropdownEventListener = () => {
    document.body.addEventListener("click", closeUserDropdown);
  };

  const removeUserDropdownEventListener = () => {
    document.body.removeEventListener("click", closeUserDropdown);
  };

  return (
    <NavbarHolder>
      {companyId ? (
        <SelectHolder
          selectedOption={
            <CompanyDropdown dropdownAvailable={!!companyId}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
              >
                <path
                  d="M22.75 16.625H20V19.375H22.75M22.75 11.125H20V13.875H22.75M25.5 22.125H14.5V19.375H17.25V16.625H14.5V13.875H17.25V11.125H14.5V8.375H25.5M11.75 5.625H9V2.875H11.75M11.75 11.125H9V8.375H11.75M11.75 16.625H9V13.875H11.75M11.75 22.125H9V19.375H11.75M6.25 5.625H3.5V2.875H6.25M6.25 11.125H3.5V8.375H6.25M6.25 16.625H3.5V13.875H6.25M6.25 22.125H3.5V19.375H6.25M14.5 5.625V0.125H0.75V24.875H28.25V5.625H14.5Z"
                  fill="black"
                />
              </svg>
              <CompanyName>
                {
                  userContext.userCompanies.filter(
                    (company) => company.id === Number(companyId)
                  )[0].name
                }
              </CompanyName>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="16"
                viewBox="0 0 16 11"
                fill="none"
                style={{ marginRight: "20px" }}
              >
                <path
                  d="M1.88 0.440002L8 6.56L14.12 0.440002L16 2.33334L8 10.3333L0 2.33334L1.88 0.440002Z"
                  fill="#575656"
                />
              </svg>
            </CompanyDropdown>
          }
        >
          <>
            {userContext.userCompanies.map((company) => (
              <SelectOption
                key={company.id}
                onClick={() => {
                  navigate(`/companies/${company.id}`);
                }}
                height="80px"
              >
                <CompanyDropdown dropdownAvailable={true} forceHeight={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="25"
                    viewBox="0 0 29 25"
                    fill="none"
                  >
                    <path
                      d="M22.75 16.625H20V19.375H22.75M22.75 11.125H20V13.875H22.75M25.5 22.125H14.5V19.375H17.25V16.625H14.5V13.875H17.25V11.125H14.5V8.375H25.5M11.75 5.625H9V2.875H11.75M11.75 11.125H9V8.375H11.75M11.75 16.625H9V13.875H11.75M11.75 22.125H9V19.375H11.75M6.25 5.625H3.5V2.875H6.25M6.25 11.125H3.5V8.375H6.25M6.25 16.625H3.5V13.875H6.25M6.25 22.125H3.5V19.375H6.25M14.5 5.625V0.125H0.75V24.875H28.25V5.625H14.5Z"
                      fill="black"
                    />
                  </svg>
                  <CompanyName>{company.name}</CompanyName>
                </CompanyDropdown>
              </SelectOption>
            ))}
          </>
        </SelectHolder>
      ) : (
        <CompanyDropdown dropdownAvailable={!!companyId}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="25"
            viewBox="0 0 29 25"
            fill="none"
          >
            <path
              d="M22.75 16.625H20V19.375H22.75M22.75 11.125H20V13.875H22.75M25.5 22.125H14.5V19.375H17.25V16.625H14.5V13.875H17.25V11.125H14.5V8.375H25.5M11.75 5.625H9V2.875H11.75M11.75 11.125H9V8.375H11.75M11.75 16.625H9V13.875H11.75M11.75 22.125H9V19.375H11.75M6.25 5.625H3.5V2.875H6.25M6.25 11.125H3.5V8.375H6.25M6.25 16.625H3.5V13.875H6.25M6.25 22.125H3.5V19.375H6.25M14.5 5.625V0.125H0.75V24.875H28.25V5.625H14.5Z"
              fill="black"
            />
          </svg>
          <CompanyName>Minhas Empresas</CompanyName>
        </CompanyDropdown>
      )}

      <UserDropdown
        onClick={() => {
          setUserDropdown(!userDropdown);
        }}
        onMouseLeave={addUserDropdownEventListener}
        onMouseEnter={removeUserDropdownEventListener}
      >
        <UserImage src={UserProfileImage} />
        <UserName>{username}</UserName>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
        >
          <path
            d="M1.88 0.440002L8 6.56L14.12 0.440002L16 2.33334L8 10.3333L0 2.33334L1.88 0.440002Z"
            fill="#575656"
          />
        </svg>
        <Logout onClick={logout} visible={userDropdown}>
          Sair
        </Logout>
      </UserDropdown>
    </NavbarHolder>
  );
};

export default Navbar;
