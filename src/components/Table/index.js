import React, { useEffect, useLayoutEffect, useState } from 'react';
import Form from '../Form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { setItemAdded,setItemEdited,setItemDeleted } from '../../Redux/globalSlice';
import {fetchProducts, deleteProduct} from "../../services/product"
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import {hasAdminRole, hasManagerRole, hasGuestRole} from "../../utils/checkRoles";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = '',
  mode = 'delete', 
  itemSelectedForEdit
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
                    
                    <Form onClose={onClose} itemSelectedForEdit={itemSelectedForEdit}/>
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

const Table = () => {
  const dispatch = useDispatch();
  const isItemAdded = useSelector((state) => state.global.isItemAdded);
  const isItemEdited = useSelector((state) => state.global.isItemEdited);
  const isItemDeleted = useSelector((state) => state.global.isItemDeleted);
  // const isAdmin = useSelector((state) => state.global.isAdmin);
  // const isManager = useSelector((state) => state.global.isManager);
  // const isGuest = useSelector((state) => state.global.isGuest)
  
  const [itemSelectedForEdit, setItemSelectedForEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalMode, setModalMode] = useState('delete');
  const cookies = new Cookies();

  const handleDelete = (item) => {
    setItemToDelete(item);
    setModalMode('delete');
    setShowModal(true);
    
  };

  const handleEdit = (item) => {
    setItemSelectedForEdit(item);
    setModalMode('edit');
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (modalMode === 'delete') {
            try {
              const response = await deleteProduct(itemToDelete.id);
              setData(response.data);
              console.log('Item deleted successfully:', response.data);
              // Optionally, you can update the local state to remove the deleted item
              
  
              dispatch(setItemDeleted(prev => !prev));
            } catch (error) {
              console.error('Unable to delete user:', error);
            }
          
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

  const token =  cookies.get('authCookies'); // Replace with your token storage mechanism
  const decoded = jwtDecode(token);

  const isAdmin = hasAdminRole(decoded.roles)  
  const isManager = hasManagerRole(decoded.roles);
  const isGuest = hasGuestRole(decoded.roles);



  const [data, setData] = useState([]);

  const fetchProductData = async () => {
    try {
      const responseData = await fetchProducts();
      setData(responseData.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [isItemAdded,isItemEdited,isItemDeleted]);
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
              <tr key={index} className="border-b ">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.seller}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  {
                    isAdmin && (
                      <button 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(item)} >
                     Edit
                   </button>
                    ) 
                  }
                                    {
                    isManager && (
                      <button 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(item)} >
                     Edit
                   </button>
                    ) 
                  }

                </td>
                <td className="px-4 py-2">
                  {
                    isAdmin && (                
                       <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>)
                  }
 
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
        itemSelectedForEdit={itemSelectedForEdit}
      />
    </div>
  );
};

export default Table;










