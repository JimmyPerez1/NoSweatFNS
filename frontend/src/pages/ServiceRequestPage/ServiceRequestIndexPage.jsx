import { useEffect, useState } from 'react';
import * as requestService from '../../services/requestService';
import { Link } from 'react-router';


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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">All Service Requests</h2>
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id}>
              <Link
                to={`/requests/${req._id}`}
                className="block bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg shadow-sm transition duration-200"
              >
                <div className="font-semibold">
                  {new Date(req.requestedDate).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  {req.issueSummary} <span className="italic text-gray-600">({req.status})</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}