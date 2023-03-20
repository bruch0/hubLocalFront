import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { GenericModal } from "@Core/Modal";

export class ReactModal implements GenericModal {
  modal = (children?: React.ReactElement) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <span>I am a modal!</span>
          <button onClick={() => setIsOpen(false)}>Close me</button>
        </StyledModal>
        <div onClick={() => setIsOpen(true)}>{children}</div>
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
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
