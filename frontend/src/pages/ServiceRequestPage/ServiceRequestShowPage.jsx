import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as requestService from '../../services/requestService';
import './ServiceRequestShowPage.css';

export default function ServiceRequestShowPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await requestService.deleteRequest(requestId);
        alert('Request deleted.');
        navigate(-1);
        } catch (err) {
        console.error('Delete failed:', err);
        alert('Something went wrong deleting the request.');
      }
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

      <Link to={-1} className="back-link">← Back</Link>
    </div>
  );
}