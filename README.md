# NASA Image Search App

The NASA Image Search App is a web application that allows users to search for NASA imagery based on keywords and view the search results in a grid. This README provides a detailed explanation of the code used to build this app.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- JavaScript: The programming language used for app logic.
- Tailwind CSS: A utility-first CSS framework for styling.

## Code Explanation

```jsx
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
          className="ml-2 bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
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
                ? 'bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer'
                : 'bg-gray-200 hover-bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md cursor-pointer'
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
```

- The code sets up the React component `Index` to build the user interface of the NASA Image Search App.

- It uses state variables to manage data, the search query, and pagination.

- The `executeSearch` function fetches data from the NASA API based on the search query. It handles API responses and errors.

- Pagination logic calculates the items to display on the current page.

- Users can search for images by entering keywords, and the "Search" button initiates the search.

- Search results are displayed as a grid of images with titles.

- Pagination controls allow users to navigate between pages of search results.

- Styling is applied using Tailwind CSS classes for responsiveness and visual appeal.

## Usage

1. Clone the project repository to your local machine.

2. Run `npm install` to install the necessary dependencies.

3. Start the development server with `npm run dev`.

4. Open your web browser and access the app at `http://localhost:3000`.

5. Enter keywords in the search bar and click the "Search" button to find NASA imagery.

## Additional Features (Challenge)

The app can be expanded by implementing the following features:

1. Pagination for navigating through

 multiple pages of search results.

2. The ability to filter search results by image type (e.g., photos, videos).

3. Improved user interface with better styling and responsiveness.

4. Deployment to a hosting service of your choice.

5. Error handling and feedback for cases where the API request fails.

