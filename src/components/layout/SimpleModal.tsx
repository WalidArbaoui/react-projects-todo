import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  openModal: boolean;
  closeModal: () => void;
};

const SimpleModal = ({ children, openModal, closeModal }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);
  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="relative m-auto p-4 pt-8 rounded-xl"
    >
      <button
        onClick={closeModal}
        className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full hover:text-red-400 hover:bg-red-100"
      >
        <Icon icon="charm:cross" width="14" height="14" />
      </button>
      {children}
    </dialog>
  );
};

export default SimpleModal;
