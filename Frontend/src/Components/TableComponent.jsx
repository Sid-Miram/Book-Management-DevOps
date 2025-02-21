const TableComponent = ({ pendingBooks }) => {
    return (
        <div className="overflow-x-auto bg-white/30 backdrop-blur-xl shadow-2xl rounded-xl p-6">
            <table className="min-w-full border-separate border-spacing-y-3">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-lg uppercase rounded-lg shadow-lg">
                    <tr>
                        <th className="p-4 text-left font-bold">👤 Member Name</th>
                        <th className="p-4 text-left font-bold">📖 Book Name</th>
                        <th className="p-4 text-left font-bold">📅 Issue Date</th>
                        <th className="p-4 text-left font-bold">⏳ Return Date</th>
                        <th className="p-4 text-left font-bold">✍ Author</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {pendingBooks.length > 0 ? (
                        pendingBooks.map((book, index) => (
                            <tr
                                key={book.id}
                                className={`transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl ${
                                    index % 2 === 0
                                        ? "bg-gray-100/70 hover:bg-gray-200"
                                        : "bg-white/70 hover:bg-gray-100"
                                } rounded-lg`}
                            >
                                <td className="p-4 text-gray-900 font-semibold">{book.memberName}</td>
                                <td className="p-4 text-gray-800">{book.bookName}</td>
                                <td className="p-4 text-gray-700">{book.issueDate}</td>
                                <td className="p-4 text-red-500 font-semibold">{book.returnDate}</td>
                                <td className="p-4 text-gray-600 italic">{book.author}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-6 text-center text-gray-600 font-semibold text-lg">
                                📭 No pending books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
