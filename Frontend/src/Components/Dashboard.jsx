import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { loadFull } from "tsparticles";
import Particles from "react-particles";
import TableComponent from "./TableComponent";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

const Dashboard = () => {
    const [pendingBooks, setPendingBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("returnDate");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;

    useEffect(() => {
        fetchPendingBooks();
    }, []);

    const fetchPendingBooks = async () => {
        try {
            const data = [
                { id: 1, memberName: "Alice", bookName: "1984", issueDate: "2024-02-01", returnDate: "2024-02-15", author: "George Orwell" },
                { id: 2, memberName: "Bob", bookName: "To Kill a Mockingbird", issueDate: "2024-01-25", returnDate: "2024-02-10", author: "Harper Lee" },
                { id: 3, memberName: "Charlie", bookName: "The Great Gatsby", issueDate: "2024-02-05", returnDate: "2024-02-20", author: "F. Scott Fitzgerald" },
                { id: 4, memberName: "David", bookName: "Moby Dick", issueDate: "2024-02-03", returnDate: "2024-02-17", author: "Herman Melville" },
                { id: 5, memberName: "Eve", bookName: "Pride and Prejudice", issueDate: "2024-02-10", returnDate: "2024-02-25", author: "Jane Austen" },
            ];
            setPendingBooks(data);
            setFilteredBooks(data);
            toast.success("📚 Books loaded successfully!");
        } catch (error) {
            toast.error("❌ Failed to fetch pending books");
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (criteria) => {
        setSortBy(criteria);
        const sortedBooks = [...filteredBooks].sort((a, b) => {
            if (criteria === "memberName") return a.memberName.localeCompare(b.memberName);
            return new Date(a[criteria]) - new Date(b[criteria]);
        });
        setFilteredBooks(sortedBooks);
        toast.info(`🔄 Sorted by ${criteria}`);
    };

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center p-8">
            {/* Particle Background */}
            <Particles
                id="tsparticles"
                init={async (main) => await loadFull(main)}
                options={{
                    background: { color: "transparent" },
                    particles: {
                        number: { value: 100 },
                        size: { value: 3 },
                        move: { enable: true, speed: 1.5 },
                        color: { value: "#ffffff" },
                        line_linked: { enable: true, color: "#ffffff" },
                    },
                }}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            <div className="relative z-10 w-full max-w-6xl p-10 bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20">
                <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
                    📚 Pending Book Returns
                </h1>

                {/* Search Bar */}
                <SearchBar books={pendingBooks} setFilteredBooks={setFilteredBooks} />

                {/* Sorting Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-6 mb-4">
                    <button onClick={() => handleSort("memberName")} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition-all">
                        🔠 Member Name
                    </button>
                    <button onClick={() => handleSort("issueDate")} className="px-6 py-2 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition-all">
                        📅 Issue Date
                    </button>
                    <button onClick={() => handleSort("returnDate")} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-all">
                        ⏳ Return Date
                    </button>
                </div>

                {/* Table or Loader */}
                <div className="mt-6">{loading ? <Loader /> : <TableComponent pendingBooks={currentBooks} />}</div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all disabled:opacity-50"
                    >
                        ◀ Previous
                    </button>
                    <span className="text-white text-lg font-semibold">Page {currentPage}</span>
                    <button 
                        disabled={indexOfLastBook >= filteredBooks.length} 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all disabled:opacity-50"
                    >
                        Next ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
