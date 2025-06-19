import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { getUser } from '../../services/authService';
import * as requestService from '../../services/requestService';

export default function ServiceRequestShowPage() {
  const { requestId, profileId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getUser();
  const id = profileId || user?.profile;

  useEffect(() => {
    async function fetchRequest() {
      try {
        const data = await requestService.getRequestById(requestId);
        setRequest(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load request:', err);
        setLoading(false);
      }
    }

    fetchRequest();
  }, [requestId]);

  async function handleDelete() {
    try {
      await requestService.deleteRequest(request._id);
      alert('Request deleted.');
      navigate(`/profile/${request.profile._id}`);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Something went wrong deleting the request.');
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>Request not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Service Request Details</h2>

        <div className="space-y-4 text-gray-700">
          <p><strong className="text-blue-700">Date:</strong> {new Date(request.requestedDate).toLocaleDateString()}</p>
          <p><strong className="text-blue-700">Issue:</strong> {request.issueSummary}</p>
          <p><strong className="text-blue-700">Status:</strong> {request.status}</p>
          <p><strong className="text-blue-700">Notes:</strong> {request.notes}</p>
        </div>

        <div className="flex justify-between mt-8 gap-4">
          <Link
            to={`/requests/${requestId}/edit`}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-lg font-semibold border-2 border-black transition">
            ✏️ Edit
          </Link>
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 px-4 rounded-lg font-semibold border-2 border-black transition">
            🗑️ Delete
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to={`/profile/${id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}