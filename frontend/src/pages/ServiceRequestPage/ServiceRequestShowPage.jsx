import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { getUser } from '../../services/authService';
import * as requestService from '../../services/requestService';
import './ServiceRequestShowPage.css';

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
    <div className="RequestShow">
      <h2>Service Request Details</h2>
      <p><strong>Date:</strong> {new Date(request.requestedDate).toLocaleDateString()}</p>
      <p><strong>Issue:</strong> {request.issueSummary}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Notes:</strong> {request.notes}</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to={`/requests/${requestId}/edit`} className="edit-button">✏️ Edit</Link>
        <button onClick={handleDelete} className="delete-button">🗑️ Delete</button>
      </div>

      <Link to={`/profile/${id}`} className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  );
}