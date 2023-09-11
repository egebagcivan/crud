type ModalProps = {
    isOpen: boolean;
    onClose: () => void;  // assuming onClose is a function that takes no arguments and returns nothing
    children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-lg w-64">
          {children}
          <button onClick={onClose} className="mt-2 btn btn-error">
            Close
          </button>
        </div>
      </div>
    );
}

export default Modal;
