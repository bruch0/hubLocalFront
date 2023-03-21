import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { GenericModal } from "@Core/Modal";

export class ReactModal implements GenericModal {
  modal = ({
    modalContent,
    modalTitle,
    backgroundColor,
    openButton,
    isOpen,
    setIsOpen,
  }: {
    modalContent: React.ReactElement;
    modalTitle: string;
    backgroundColor: string;
    openButton?: React.ReactElement;
    isOpen: boolean;
    setIsOpen:
      | React.Dispatch<React.SetStateAction<boolean>>
      | ((value: boolean) => void);
  }) => {
    const [opacity, setOpacity] = useState(0);

    function toggleModal() {
      setOpacity(0);
      setIsOpen(!isOpen);
    }

    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 100);
    }

    function beforeClose() {
      return new Promise((resolve) => {
        setOpacity(0);
        setTimeout(resolve, 300);
      });
    }

    return (
      <>
        <StyledModal
          isOpen={isOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <ModalContainer>
            <ModalTopBar backgroundColor={backgroundColor}>
              <ModalTitle>{modalTitle}</ModalTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                cursor="pointer"
                onClick={() => setIsOpen(false)}
              >
                <path
                  d="M2.66659 23.6666L0.333252 21.3333L9.66659 12L0.333252 2.66665L2.66659 0.333313L11.9999 9.66665L21.3333 0.333313L23.6666 2.66665L14.3333 12L23.6666 21.3333L21.3333 23.6666L11.9999 14.3333L2.66659 23.6666Z"
                  fill="white"
                />
              </svg>
            </ModalTopBar>
            <ModalContentContainer>{modalContent}</ModalContentContainer>
          </ModalContainer>
        </StyledModal>
        <div onClick={() => setIsOpen(true)}>{openButton}</div>
      </>
    );
  };

  provider = (children?: React.ReactElement) => (
    <ModalProvider backgroundComponent={FadingBackground}>
      {children}
    </ModalProvider>
  );
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const StyledModal = styled(Modal)`
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  width: 50vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTopBar = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  padding: 0px 40px;
  border-radius: 5px 5px 0px 0px;
`;

const ModalTitle = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

const ModalContentContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 5px 5px;
`;
