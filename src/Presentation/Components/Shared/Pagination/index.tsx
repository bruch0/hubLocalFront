import { useState } from "react";

import {
  ItemsPerPageHolder,
  SelectedOption,
  OptionButton,
  OptionsHolder,
  PaginationContainer,
  PaginationHolder,
  ItemName,
  PageNumber,
  ChangePageButton,
} from "./styles";

interface ItemsPerPageProps {
  changeItemsPerPage: (items: number) => void;
  itemsPerPage: number;
  page: number;
  maxPageNumber: number;
  changePageNumber: (page: number) => void;
}

const ItemsPerPage = ({
  changeItemsPerPage,
  itemsPerPage,
  page,
  maxPageNumber,
  changePageNumber,
}: ItemsPerPageProps) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const toogleOpenOptions = () => setOpenOptions(!openOptions);

  const paginationOptions = [
    {
      text: "10",
      onClick: () => {
        changeItemsPerPage(10);
        toogleOpenOptions();
      },
    },
    {
      text: "20",
      onClick: () => {
        changeItemsPerPage(20);
        toogleOpenOptions();
      },
    },
    {
      text: "50",
      onClick: () => {
        changeItemsPerPage(50);
        toogleOpenOptions();
      },
    },
    {
      text: "100",
      onClick: () => {
        changeItemsPerPage(100);
        toogleOpenOptions();
      },
    },
  ];

  const closeDropdown = () => {
    setOpenOptions(false);
    document.body.removeEventListener("click", closeDropdown);
  };

  const addCloseDropdownListener = () => {
    document.body.addEventListener("click", closeDropdown);
  };

  const removeCloseDropdownListener = () => {
    document.body.removeEventListener("click", closeDropdown);
  };

  return (
    <PaginationContainer>
      <PaginationHolder>
        <PageNumber>
          <ItemName style={{ fontWeight: "bold", marginRight: "10px" }}>
            Página:
          </ItemName>
          {page}
        </PageNumber>
        <ItemsPerPageHolder>
          <SelectedOption
            onMouseEnter={removeCloseDropdownListener}
            onMouseLeave={addCloseDropdownListener}
            onClick={toogleOpenOptions}
          >
            <div style={{ marginRight: "10px" }}>
              <ItemName style={{ fontWeight: "bold", marginRight: "10px" }}>
                Qt por página:
              </ItemName>
              {itemsPerPage}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
                fill="black"
              />
            </svg>
          </SelectedOption>
          {openOptions && (
            <OptionsHolder>
              {paginationOptions.map((option, index) => (
                <OptionButton onClick={option.onClick} key={index}>
                  {option.text}
                </OptionButton>
              ))}
            </OptionsHolder>
          )}
        </ItemsPerPageHolder>
        <ChangePageButton
          disabled={page - 1 === 0}
          onClick={() => changePageNumber(page - 1)}
        >
          Anterior
        </ChangePageButton>
        <ChangePageButton
          disabled={page + 1 > maxPageNumber}
          onClick={() => changePageNumber(page + 1)}
        >
          Próxima
        </ChangePageButton>
      </PaginationHolder>
    </PaginationContainer>
  );
};

export default ItemsPerPage;
