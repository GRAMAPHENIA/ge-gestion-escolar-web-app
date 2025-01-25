// institutionDeleteCard.tsx

import React from "react";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">¿Estás seguro?</h2>
        <p className="text-gray-300">Esta acción no se puede deshacer.</p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
