import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getUser } from '../../services/authService';
import * as requestService from '../../services/requestService';


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
      navigate(`/requests/${requestId}`);
    } catch (err) {
      console.error('Failed to update request:', err);
      alert('Something went wrong.');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Edit Service Request</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {user?.isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Summary</label>
              <input
                type="text"
                name="issueSummary"
                value={formData.issueSummary}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Requested Date</label>
            <input
              type="date"
              name="requestedDate"
              value={formData.requestedDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {user?.isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ✅ Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              ← Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}