import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Sidebar from '../components/UserSidebar';
import styles from '../styles/UserSearch.module.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');  

  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
      <div className={styles.SearchContentPage}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.mainHeading}>Search <span>Users</span></h1>
          <div className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
              />
            </div>
            <button
              className={styles.searchButton}
              onClick={handleSearch}  
            >
              Search
            </button>
          </div>
        </div>
      </div>
 
  );
};

export default Search;
