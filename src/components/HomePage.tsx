import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation  } from 'react-router-dom';

interface Startup {
    id: number;
    owner: number;
    startup_name: string;
    startup_description: string | null;
    industry_sector: string | null;
    founding_date: string | null;
    founder_bio: string | null;
    website_url: string | null;
    contact_person: string | null;
    contact_number: string | null;
    banner_image: string | null;
}

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [startups, setStartups] = useState<Startup[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    const BASE_URL = 'http://127.0.0.1:8000/';


    useEffect(() => {
        // Fetch startup data from the API using Axios
        axios.get(`${BASE_URL}api/startup/`)
            .then(response => {
                if (response.data.results) {
                    setStartups(response.data.results);
                }
            })
            .catch(error => console.error('Error fetching startup data:', error));
    }, []); // Empty dependency array ensures the effect runs only once

    useEffect(() => {
        const isHomePage = true;
        document.body.classList.toggle('home-page', isHomePage);
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    return (
        <div className='container mt-4'>
            <div className="row">
                {startups.length > 0 &&
                    startups.map((startup, index) => (
                        <div
                            key={startup.id}
                            className={`col-md-8 ${index === currentCardIndex ? '' : 'd-none'}`}
                            onClick={() => navigate(`/startup/${startup.id}`)} // Use navigate for redirection
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card">
                                {/* Display the banner image */}
                                <img
                                    src={startup.banner_image}
                                    className="card-img-top"
                                    alt={`Banner for ${startup.startup_name}`}
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />

                                {/* Card content goes here, using data from the API */}
                                <div className="card-body">
                                    <h5 className="card-title">{startup.startup_name}</h5>
                                    <p className="card-text">{startup.startup_description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomePage;

