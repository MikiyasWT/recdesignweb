

import React, { useState } from 'react';
import Form from '../Form';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = '',
  mode = 'delete', // 'delete' or 'edit'
}) => {
  return (
    isOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-md w-full">
            <div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {mode === 'delete' ? (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {/* Add your edit modal content here */}
                    
                    <Form onClose={onClose}/>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const Table = ({ data = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalMode, setModalMode] = useState('delete');

  const handleDelete = (item) => {
    setItemToDelete(item);
    setModalMode('delete');
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setModalMode('edit');
    setShowModal(true);
  };

  const confirmAction = () => {
    if (modalMode === 'delete') {
      // Add your delete logic here
      console.log('Deleting item:', itemToDelete);
    } else {
      // Add your edit logic here
      console.log('Editing item:', itemToEdit);
    }
    setShowModal(false);
    setItemToEdit(null);
    setItemToDelete(null);
  };

  const cancelAction = () => {
    setShowModal(false);
    setItemToEdit(null);
    setItemToDelete(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Seller</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.seller}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  <button 
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                     onClick={() => handleEdit(item)} >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={showModal}
        onClose={cancelAction}
        onConfirm={confirmAction}
        title={modalMode === 'delete' ? 'Confirm Delete' : 'Update Prodcut'}
        message={modalMode === 'delete' ? 'Are you sure you want to delete this item?' : ''}
        mode={modalMode}
      />
    </div>
  );
};

export default Table;










