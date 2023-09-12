import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalId: string;
};

function Modal({ isOpen, onClose, children, modalId }: ModalProps) {
  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (isOpen) {
        modal?.showModal();
    } else {
        modal?.close();
    }
  }, [isOpen]);

  return (
      <dialog id={modalId} className="modal">
          <div className="modal-box">
              <form method="dialog">
                  <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={onClose}
                  >
                      ✕
                  </button>
              </form>
              {children}
          </div>
      </dialog>
  );
}

export default Modal;
