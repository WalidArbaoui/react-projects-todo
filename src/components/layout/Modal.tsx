import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  title: string;
};

const Modal = ({ children, title }: Props) => {
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("open");
    }
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.add("open");
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (modalRef.current) {
        modalRef.current.classList.remove("open");
      }
    };
  }, []);

  return (
    <div className="modalDiv">
      <div className="modal flex flex-col" ref={modalRef}>
        <div className="flex items-center p-6 gap-4">
          <button
            onClick={handleCloseModal}
            className="block p-1 bg-gray-200 rounded-full hover:text-red-400 hover:bg-red-100"
          >
            <Icon icon="charm:cross" width="18" height="18" />
          </button>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
