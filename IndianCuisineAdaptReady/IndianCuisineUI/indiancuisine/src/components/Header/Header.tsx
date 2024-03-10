import React, { useState } from 'react';
import './Header.css';
import Fuse from 'fuse.js';

export const Header = ({ data, setFilteredData }: any) => {
    const [query, setQuery] = useState('');
    const fuse = new Fuse(data, {
        keys: ['name', 'ingredients', 'state', 'region'],
        threshold: 0

    });

    const handleSearch = () => {
        const results = query === '' ? data : fuse.search(query);
        const searchResults = results.map((item: any) => item.item);
        if (query === '') {
            setFilteredData(data);
        }
        else {
            setFilteredData(searchResults);
        }
    };
   
    return (
        <div className="header">
            <h1>Dish Search</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={query}
                    style={{ color: 'black' }}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default Header;
