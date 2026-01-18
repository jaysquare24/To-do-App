import { useEffect } from "react";
import { createPortal } from "react-dom";

export const  Modal= ({ open, children }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  if (!open) return null;
  return createPortal (
    <>
      <div className="modal-overlay" />
      <div className="modal">{children}</div>
    </>,
    document.body
  );
}