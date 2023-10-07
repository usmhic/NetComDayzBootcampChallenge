import React, { useState, useEffect } from 'react';

const ImageGrid = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the NASA API
    fetch('http://images-api.nasa.gov/search?q=obama')
      .then((response) => response.json())
      .then((data) => setData(data.collection.items));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="border p-4">
          <img src={item.links[0].href} alt={item.data[0].title} className="max-w-full" />
          <p className="mt-2">{item.data[0].title}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
