import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ChatForm from './ChatForm'

interface Startup {
  id: string;
  startup_name: string;
  banner_image: string;
  startup_description: string;
  industry_sector: string | null;
  founding_date: string | null;
  founder_bio: string;
  website_url: string | null;
}

interface IndividualStartupDetailsProps {
  startup: Startup;
}

const IndividualStartupDetails: React.FC<IndividualStartupDetailsProps> = ({ startup }) => {
  const { id } = useParams<{ id: string }>();
  const [startupDetails, setStartupDetails] = useState<Startup | null>(null);
  const BASE_URL = 'http://127.0.0.1:8000/';
  const [showChat, setShowChat] = useState(false); // State to manage modal visibility

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/startup/${id}/`)
      .then((response) => {
        if (response.data.results) {
          setStartupDetails(response.data.results);
        }
      })
      .catch((error) => console.error('Error fetching startup details:', error));
  }, [id]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="container mt-4">
      {startupDetails && (
        <>
          <div className="card">
            <img
              src={startupDetails.banner_image || startup.banner_image}
              className="card-img-top"
              alt={`Banner for ${startupDetails.startup_name}`}
            />
          </div>
  
          <div className="details-container mt-4">
            <div className="title">
              <h1 className="ams-title">{startupDetails.startup_name}</h1>
            </div>
            <div className="description">
              <p>{startupDetails.startup_description}</p>
            </div>
            <div className="industry">
              <p>
                <strong><h3>Industry Sector:</h3></strong> {startupDetails.industry_sector}
              </p>
            </div>
            <div className="founding-date">
              <p>
                <strong>Founding Date:</strong> {startupDetails.founding_date}
              </p>
            </div>
            <div className="founder-bio">
              <p>
                <strong>Founder Bio:</strong> {startupDetails.founder_bio}
              </p>
            </div>
            <div className="website-url">
              <p>
                <strong>Website URL:</strong> {startupDetails.website_url}
              </p>
            </div>
            {/* Add more details as needed */}
          </div>
  
          <div className="mt-3">
            <button className="btn btn-primary" onClick={toggleChat}>
              Connect
            </button>
          </div>
  
          {/* Chat Modal */}
          {showChat && startupDetails && (
            <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Connect with {startupDetails.startup_name}</h5>
                    <button type="button" className="close" onClick={toggleChat}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* Pass the room name as the startup name */}
                    <ChatForm roomName={startupDetails.startup_name} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
  };
  
  export default IndividualStartupDetails;
  
