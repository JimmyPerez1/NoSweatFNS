import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceRequestForm from '../../components/ServiceRequestForm/ServiceRequestForm';
import { createRequest } from '../../services/requestService';
import * as profileService from '../../services/profileService';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const { profileId } = useParams();
  // console.log("Profile ID from useParams:", profileId);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);


  useEffect(() => {
    async function fetchProfile() {
      if (!profileId) return;

      // console.log('Fetching profile with ID:', profileId); 
      try {
        const data = await profileService.getById(profileId);
        // console.log('Fetched profile:', data); 
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
      console.log('Submitting request with:', formData);
      const res = await createRequest(dataToSend);
      console.log('Response:', res);
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
        {isAdmin && <button className="admin-only">🔎Admin Tools</button>}
      </aside>

      <main className="Dashboard">
        <h2>My Dashboard</h2>

        <section className="panel">
          <div className="panel-header">
            <h3>Client Info</h3>
            <button>Edit</button>
          </div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
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
            {isAdmin && <button className="admin-only">Edit</button>}
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
                <button className="admin-only"> ➕Add New</button>
                <button className="admin-only">Edit</button>
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
                <button className="admin-only">Edit</button>
              </>
            )}
          </div>
          <ul>
            {profile.serviceRequests.map((req, idx) => (
              <li key={idx} className="service-request-line">
                <div className="service-request-left">
                  {new Date(req.requestedDate).toLocaleDateString()}
                  &nbsp;|&nbsp;
                  <span className="service-request-left">
                    <Link to={`/requests/${req._id}`} className="request-link">
                      {req.issueSummary}
                    </Link>
                  </span>
                </div>
                <div className="service-request-status">
                  | Status: {req.status}
                </div>
              </li>
            ))}
          </ul>
        </section>
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
