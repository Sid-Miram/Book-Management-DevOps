import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import dataJson from '../data.json';

function Home() {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [issuedPercentage, setIssuedPercentage] = useState(0);

    useEffect(() => {
        const categories = Object.keys(dataJson);
        const bookCount = categories.reduce((acc, category) => acc + dataJson[category].length, 0);
        
        setTotalBooks(bookCount);
        setTotalCategories(categories.length);

        // Simulated issued books percentage (adjust as needed)
        const issuedBooks = Math.floor(bookCount * 0.7); // 70% issued
        setIssuedPercentage((issuedBooks / bookCount) * 100);

        // Prepare chart data
        const formattedData = categories.map(category => ({
            name: category,
            books: dataJson[category].length
        }));

        setChartData(formattedData);
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                {/* Books Card */}
                <div className='card book-card'>
                    <div className='card-inner'>
                        <h3>BOOKS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{totalBooks}</h1>
                </div>

                {/* Genres Card */}
                <div className='card genre-card'>
                    <div className='card-inner'>
                        <h3>GENRES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{totalCategories}</h1>
                </div>

                {/* Customers Card */}
                <div className='card customer-card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>33</h1>
                </div>
            </div>

            <div className='chart-progress-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className='charts' style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="books" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

               {/* Circular Progress Bar (Issued Books) */}
               <motion.div 
                    className='circular-progress'
                    initial={{ x: 50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        width: 140, height: 140, marginLeft: 40, boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                        padding: 10, borderRadius: '50%', backgroundColor: '#fff', display: 'flex',
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <CircularProgressbar
                        value={issuedPercentage}
                        text={`${Math.round(issuedPercentage)}%`}
                        styles={buildStyles({
                            textSize: '16px',
                            pathColor: `#3e98c7`,
                            textColor: '#3e98c7',
                            trailColor: '#eee',
                            strokeLinecap: "round"
                        })}
                    />
                    <p style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: '#555' }}>Issued Books</p>
                </motion.div>
            </div>
        </main>
    );
}

export default Home;
