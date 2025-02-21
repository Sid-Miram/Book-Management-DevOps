import { useState } from "react";

function SearchBar({ books, setFilteredBooks }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);

        const filtered = books.filter((book) =>
            book.bookName.toLowerCase().includes(value) || 
            book.memberName.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value)
        );
        setFilteredBooks(filtered);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="🔍 Search by book name, author, or member..."
            className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
}

export default SearchBar;
