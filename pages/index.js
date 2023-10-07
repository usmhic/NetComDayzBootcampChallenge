import React, { useState, useEffect } from 'react';

const Index = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  const executeSearch = () => {
    // Fetch data from the NASA API with the searchQuery
    const apiUrl = `https://images-api.nasa.gov/search?q=${searchQuery}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.collection && data.collection.items) {
          setData(data.collection.items);
        } else {
          // Handle the case where the API response does not match the expected structure.
          console.error('Invalid API response:', data);
        }
      })
      .catch((error) => {
        console.error('API request failed:', error);
      });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    executeSearch();
    setCurrentPage(1); // Reset to the first page when a new search is initiated.
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-700">NASA Image Search</h1>
      <div className="mb-4 mt-4">
        <input
          type="text"
          placeholder="Search for images..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-2/3 text-black"
          // Add text-black class to set the text color to black
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {currentItems.map((item, index) => (
          <div key={index} className="border p-4">
            <img src={item.links[0].href} alt={item.data[0].title} className="max-w-full" />
            <p className="mt-2">{item.data[0].title}</p>
          </div>
        ))}
      </div>
      <div className="pagination mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={
              currentPage === index + 1
                ? 'bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md cursor-pointer'
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
