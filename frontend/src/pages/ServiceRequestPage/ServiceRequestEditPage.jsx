import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';
import * as requestService from '../../services/requestService';
import './ServiceRequestEditPage.css';

export default function ServiceRequestEditPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [formData, setFormData] = useState({
    issueSummary: '',
    requestedDate: '',
    status: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestService.getRequestById(requestId);
        if (!data) {
          console.error('No data returned for request ID:', requestId);
          return;
        }

        setFormData({
          issueSummary: data.issueSummary || '',
          requestedDate: new Date(data.requestedDate).toISOString().slice(0, 10),
          status: data.status || 'pending',
          notes: data.notes || ''
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load request for editing:', err);
      }
    }
    fetchData();
  }, [requestId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await requestService.updateRequest(requestId, formData);
      alert('Request updated successfully.');
      console.log('Submitting formData:', formData);
      navigate(`/requests/${requestId}`);
    } catch (err) {
      console.error('Failed to update request:', err);
      alert('Something went wrong.');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="EditRequestPage">
      <h2>Edit Service Request</h2>
      <form onSubmit={handleSubmit}>
                {user?.isAdmin && (
          <>
        <label>Issue Summary</label>
        <input
          type="text"
          name="issueSummary"
          value={formData.issueSummary}
          onChange={handleChange}
          required
        />
                  </>
        )}

        <label>Requested Date</label>
        <input
          type="date"
          name="requestedDate"
          value={formData.requestedDate}
          onChange={handleChange}
          required
        />
        

        {user?.isAdmin && (
          <>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </>
        )}

        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">✅ Save Changes</button>
        <button type="button" onClick={() => navigate(-1)}>← Cancel</button>
      </form>
    </div>
  );
}