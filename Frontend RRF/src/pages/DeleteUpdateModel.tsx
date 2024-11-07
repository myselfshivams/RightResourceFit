import React from "react";
import "../styles/DeleteUpdateModel.css";

interface ModalProps {
  // title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const DeleteUpdateModal: React.FC<ModalProps> = ({
  // title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        {/* <h2>{title}</h2> */}
        <p>{message}</p>
        <div className="modalActions">
          <button className="modalConfirmBtn" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="modalCancelBtn" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUpdateModal;
