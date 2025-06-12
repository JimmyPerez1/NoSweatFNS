import { useState } from 'react';
import './ServiceRequestForm.css';

export default function ServiceRequestForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    appliance: '',
    issueSummary: 'Filled out by Technician',
    requestedDate: '',
    notes: '',
  });

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
          <label>Appliance ID (if known)</label>
          <input
            type="text"
            name="appliance"
            value={formData.appliance}
            onChange={handleChange}
            placeholder="Leave blank if unknown"
          />

          <label>Requested Date</label>
          <input
            type="date"
            name="requestedDate"
            value={formData.requestedDate}
            onChange={handleChange}
          />

          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Optional"
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}