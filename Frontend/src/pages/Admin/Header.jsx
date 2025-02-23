import React from 'react';
import { BsJustify, BsSearch } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search Books, Customers"
        />
        <BsSearch className="icon" />
      </div>
    </header>
  );
}

export default Header;
