import React, { useContext, useState } from 'react';
import { CreateContextApi } from '../context/MyContextApi';

const SearchBar = ({ onSearch }) => {
  const context = useContext(CreateContextApi);
  const { products, setSearchResult, setOffset } = context;
  const [query, setQuery] = useState('');


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query !== '') {
      const searchRe = products.filter((product) => {
        if (product.title.toLowerCase().includes(query.toLowerCase())) {
          return product
        }
      })
      setSearchResult(searchRe);
      if (searchRe.length > 0) {
        setOffset(true)
      }
      console.log(searchRe)
    }
    else{
      setOffset(false)
      setSearchResult([])
    }
    // 
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;