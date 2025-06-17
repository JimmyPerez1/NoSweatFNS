import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceRequestForm from '../../components/ServiceRequestForm/ServiceRequestForm';
import { createRequest } from '../../services/requestService';
import * as profileService from '../../services/profileService';
import Modal from '../../components/Modal/Modal';
import DragAndDropUploader from '../../components/DragAndDropUploader/DragAndDropUploader';
import { signIn } from '../../services/documentService'
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState('');


  useEffect(() => {
    async function fetchProfile() {
      if (!profileId) return;

      try {
        const data = await profileService.getById(profileId);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err.response || err.message || err); setLoading(false);
      }
    }

    fetchProfile();
  }, [profileId]);

  async function handleCreateRequest(formData) {
    try {
      const dataToSend = { ...formData };
      if (!dataToSend.appliance || dataToSend.appliance.trim() === '') {
        delete dataToSend.appliance;
      }
      const res = await createRequest(dataToSend);
      alert('Service request submitted!');
      setShowRequestForm(false);

      const updatedProfile = await profileService.getById(profileId);
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Error in createRequest:', err.response || err.message || err);
      alert('Something went wrong submitting the request.');
    }
  }

  if (!profile) return <p>Loading...</p>;

  const isAdmin = user?.isAdmin;

  return (
    <div className="ProfilePage">
      <aside className="Sidebar">
        <h3>My Info</h3>
        {!isAdmin && (
          <>
            <button onClick={() => setShowRequestForm(true)}>➕Request Service</button>
            <button>💲Make a Payment</button>
          </>
        )}
        {isAdmin && (
          <>
            <Link to="/admin/search">
              <button className="admin-only">🔎 Search Clients</button>
            </Link>
            <Link to="/requests">
              <button className="admin-only">🔎 View Requests</button>
            </Link>
            <button onClick={signIn} className="admin-only">
              🔐 Login to Supabase
            </button>
          </>
        )}
      </aside>

      <main className="Dashboard">
        <h2>My Dashboard</h2>

        <section className="panel">
          <div className="panel-header">
            <h3>Client Info</h3>
            <button>Edit</button>
          </div>
          <p>Name: {profile.user.name}</p>
          <p>Email: {profile.user.email}</p>
          <p>Phone: {profile.phone}</p>
          <ul>
            {profile.addresses.map((addr, idx) => (
              <li key={idx}>
                {addr.label}: {addr.street}, {addr.city}, {addr.state} {addr.zip}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Appliances & Warranty Info</h3>
            {isAdmin && (
              <>
                <button className="admin-only"> ➕Add New</button>
                <button className="admin-only">✏️Edit</button>
              </>
            )}
          </div>
          {profile.appliances.length ? (
            <ul>
              {profile.appliances.map((appliance, idx) => (
                <li key={idx}>
                  {appliance.brand} {appliance.type} - Last Serviced: {new Date(appliance.lastServiced).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appliances listed.</p>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Documents</h3>
            {isAdmin && (
              <>
                <button
                  className="admin-only"
                  onClick={() => {
                    console.log('Add New Document clicked');
                    setSelectedDocType('');
                    setSelectedWorkOrder('');
                    setShowUploader(true);
                  }}
                >
                  ➕ Add New
                </button>
                <button className="admin-only">✏️Edit</button>
              </>
            )}
          </div>
          <ul>
            {profile.documents.map((doc, idx) => (
              <li key={idx}><a href={doc.url} target="_blank" rel="noreferrer">{doc.type}</a></li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Invoices</h3>
            {isAdmin && (
              <>

                <button
                  className="admin-only"
                  onClick={() => {
                    console.log('Add New Invoice clicked');
                    setSelectedDocType('');
                    setSelectedWorkOrder('');
                    setShowUploader(true);
                  }}
                >
                  ➕ Add New
                </button>
                <button className="admin-only">✏️Edit</button>
              </>
            )}
          </div>
          <ul>
            {profile.documents.map((doc, idx) => (
              <li key={idx}><a href={doc.url} target="_blank" rel="noreferrer">{doc.type}</a></li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Service Binder</h3>
            {isAdmin && (
              <>
                <button className="admin-only"> ➕Add New</button>
                <button className="admin-only">✏️Edit</button>
              </>
            )}
          </div>
          {profile.serviceRequests.length ? (
            <table className="service-binder-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Work Order #</th>
                  <th>Issue Summary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.serviceRequests.map((req, idx) => (
                  <tr key={idx}>
                    <td>{new Date(req.requestedDate).toLocaleDateString()}</td>
                    <td>{req.workOrderNumber || 'N/A'}</td>
                    <td>
                      <Link to={`/requests/${req._id}`} className="request-link">
                        {req.issueSummary}
                      </Link>
                    </td>
                    <td>{req.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No service requests yet.</p>
          )}
        </section>
        {showUploader && (
          <Modal onClose={() => setShowUploader(false)}>
            <div className="uploader-modal-content">
              <h4>Upload New {selectedDocType || 'File'}</h4>
              <div className="work-order-selector">
                <label htmlFor="workOrderNumber">Work Order #:</label>
                <select
                  id="workOrderNumber"
                  value={selectedWorkOrder}
                  onChange={(e) => setSelectedWorkOrder(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {profile.serviceRequests.map((req) => (
                    <option key={req._id} value={req.workOrderNumber}>
                      {req.workOrderNumber || `#${req._id.slice(-4)} (No Number)`}
                    </option>
                  ))}
                </select>
                <div className="doc-type-selector">
                  <label htmlFor="docType">Document Type:</label>
                  <select
                    id="docType"
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                  >
                    <option value="">-- Select Type --</option>
                    <option value="Invoice">Invoice</option>
                    <option value="Contract">Contract</option>
                    <option value="Estimates">Estimates</option>
                    <option value="Warranty">Warranty</option>
                    <option value="WorkOrderForm">WorkOrderForm</option>
                  </select>
                </div>
              </div>
              {selectedDocType ? (
                <DragAndDropUploader
                  docType={selectedDocType}
                  workOrderNumber={selectedWorkOrder || 'Unassigned'}
                  profileId={profile._id}
                  onUploadComplete={async () => {
                    setShowUploader(false);
                    setSelectedWorkOrder('');
                    const updated = await profileService.getById(profileId);
                    setProfile(updated);
                  }}
                />
              ) : (
                <p style={{ color: 'red', marginTop: '1rem' }}>
                  Please select a document type to continue.
                </p>
              )}
            </div>
          </Modal>
        )}
      </main>
      {showRequestForm && (
        <ServiceRequestForm
          onSubmit={handleCreateRequest}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
}

