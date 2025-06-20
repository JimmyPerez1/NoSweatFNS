import { useState, useEffect } from 'react';
import { getUser } from '../../services/authService';
import * as applianceService from '../../services/applianceService';

export default function ServiceRequestForm({ onSubmit, onClose }) {
  const user = getUser();
  const [appliances, setAppliances] = useState([]);
  const [formData, setFormData] = useState({
    applianceId: '',
    issueSummary: 'Diagnostic Work Order',
    requestedDate: '',
    notes: '',
  });

  useEffect(() => {
    async function fetchAppliances() {
      try {
        const data = await applianceService.getAppliances();
        setAppliances(data);
      } catch (err) {
        console.error('Error fetching appliances:', err);
      }
    }
    fetchAppliances();
  }, []);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(formData);
    onClose();
  }

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h3>Request Service</h3>
        <form onSubmit={handleSubmit}>
          {user?.isAdmin && (
            <>
              <label>Appliance Type</label>
              <select
                name="applianceId"
                value={formData.applianceId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Appliance --</option>
                {appliances.map(appliance => (
                  <option key={appliance._id} value={appliance._id}>
                    {appliance.brand} – {appliance.type}
                  </option>
                ))}
              </select>
              {appliances.length === 0 && (
                <p className="no-appliances-msg">
                  ⚠️ No appliances available for this user.
                </p>
              )}
            </>
          )}

          <label>Requested Date</label>
          <input
            type="date"
            name="requestedDate"
            value={formData.requestedDate}
            onChange={handleChange}
          />

          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="5"
            placeholder="What's Going on?"
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}