import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = () => {
    fetch('http://localhost:5037/api/scrapper/products')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <div className="App">
      <Table data={data} />
    </div>
  );
}

export default App;
