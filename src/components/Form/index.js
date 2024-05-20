import React, { useState } from 'react';

const FormField = ({ label, name, value, onChange, type = 'text', error }) => {
    const formatCurrency = (value) => {
        // Format the value as currency
        return value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
      };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-bold mb-2 text-gray-700">
        {label}:
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? 'border-red-500 focus:ring-red-400' : ''
          }`}
          rows={5}
        />
      ) : type === 'currency' ? (
        <div className="relative">
          <input
            type="text"
            id={name}
            name={name}
            value={formatCurrency(value)}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^0-9.-]+/g, '');
              onChange({ target: { name, value: inputValue } });
            }}
            className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 pr-8 ${
              error ? 'border-red-500 focus:ring-red-400' : ''
            }`}
          />
          <span className="absolute inset-y-0 right-2 flex items-center text-gray-500">
            {formatCurrency(value)}
          </span>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            error ? 'border-red-500 focus:ring-red-400' : ''
          }`}
        />
      )}
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const Form = ({onClose}) => {
  const [formData, setFormData] = useState({
    title: '',
    seller: '',
    price: '',
    detail: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    seller: '',
    price: '',
    detail: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate form fields
    if (!formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Title is required' }));
      isValid = false;
    }
    if (!formData.seller.trim()) {
      setErrors((prev) => ({ ...prev, seller: 'Seller is required' }));
      isValid = false;
    }
    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      setErrors((prev) => ({ ...prev, price: 'Please enter a valid price' }));
      isValid = false;
    }

    if (isValid) {
      // Handle form submission logic here
      console.log(formData);
      // Clear the form
      setFormData({
        title: '',
        seller: '',
        price: '',
        detail: '',
      });
      setErrors({
        title: '',
        seller: '',
        price: '',
        detail: '',
      });
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      seller: '',
      price: '',
      detail: '',
    });
    setErrors({
      title: '',
      seller: '',
      price: '',
      detail: '',
    });
    onClose()
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <FormField
        label="Product name"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        error={errors.title}
      />
      <FormField
        label="Seller"
        name="seller"
        value={formData.seller}
        onChange={handleInputChange}
        error={errors.seller}
      />
      <FormField
        label="Price"
        name="price"
        type="currency"
        value={formData.price}
        onChange={handleInputChange}
        error={errors.price}
      />
      <FormField
        label="Detail"
        name="detail"
        type="textarea"
        value={formData.detail}
        onChange={handleInputChange}
        error={errors.detail}
      />


        <div className=' w-full flex flex-row gap-6 mx-2'>
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Submit
      </button>
      <button
          type="button"
          onClick={handleClear}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Cancel
        </button>
        </div>
    </form>
  );
};

export default Form;