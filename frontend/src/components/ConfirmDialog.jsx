import { useEffect } from 'react';

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-icon">⚠️</div>
        <h3>Confirmation</h3>
        <p>{message || 'Êtes-vous sûr de vouloir continuer ?'}</p>
        <div className="dialog-buttons">
          <button className="dialog-btn-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button className="dialog-btn-confirm" onClick={onConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}