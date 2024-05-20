import {ConfirmationModal} from '../Table/index'
import Form from '../Form';
import { useState, useSelector } from 'react';
import Cookies from 'universal-cookie';
import { getRoleFromToken } from '../../utils/jwtDecode';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { setItemAdded } from '../../Redux/globalSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const [addSelected, setAddSelected] = useState(false);
    const cookies = new Cookies();

    const token =  cookies.get('authCookies'); // Replace with your token storage mechanism
    const decoded = jwtDecode(token);
    

    const openAddingModal = () => {
        setAddSelected((prev) => !prev);
    }

    const handleLogout = () => {
        cookies.remove('authCookies');
        window.location.href = '/login'; // Redirect to login page
      };

const startScrapping = async () => {
    try {
        const url = 'http://localhost:5037/api/scrapper?pageCount=1'; // Replace with your actual URL
        const response = await axios.get(url);
        console.log(response.data); 
        dispatch(setItemAdded((prev) => !prev));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle any errors that might occur during the request
      }
}
    return(
<nav class="bg-white border-gray-200 dark:bg-gray-900 w-full mb-4">
    <div class="w-full flex flex-wrap justify-between items-center mx-auto  p-4 ">
        <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://recognisedesign.com/recognise_files/rd-logo.webp" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Recognise Design</span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="#" onClick={handleLogout} class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</a>
        </div>
    </div>
    <div class="w-full flex flex-wrap justify-end items-center mx-auto  p-4 bg-gray-300">
       <button onClick={startScrapping} type="button" class="text-white mx-4 flex flex-row justify- bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Run Scrapping</button>
       <button onClick={openAddingModal} type="button" class="text-white flex flex-row justify- bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Product</button>
    </div>

{
    addSelected && (
        <div className="fixed z-10 inset-0 overflow-y-auto" onClick={openAddingModal}>
        <div className="flex items-center justify-center min-h-screen px-4 text-center " >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-md w-full">
            <div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Product
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Add a new Product</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Form onClose={openAddingModal}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


</nav>


    );
}

export default Navbar;



















