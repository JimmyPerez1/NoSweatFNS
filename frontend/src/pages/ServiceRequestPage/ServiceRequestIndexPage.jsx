import { useEffect, useState } from 'react';
import * as requestService from '../../services/requestService';
import { Link } from 'react-router-dom';
import './ServiceRequestIndexPage.css';

export default function ServiceRequestIndexPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchAllRequests() {
      try {
        const data = await requestService.getRequests();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching service requests:', err);
      }
    }

    fetchAllRequests();
  }, []);

  return (
    <div className="RequestIndex">
      <h2>All Service Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req._id}>
            <Link to={`/requests/${req._id}`}>
              {new Date(req.requestedDate).toLocaleDateString()} — {req.issueSummary} ({req.status})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}