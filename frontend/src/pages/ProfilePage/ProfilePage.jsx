import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import * as profileService from '../../services/profileService';
import './ProfilePages.css';

export default function ProfilePage({ user }) {
  const { profileId } = useParams(); 
  console.log("Profile ID from useParams:", profileId);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  async function fetchProfile() {
    if (!profileId) return;

    console.log('Fetching profile with ID:', profileId); 
    try {
      const data = await profileService.getById(profileId);
      console.log('Fetched profile:', data); 
      setProfile(data);
      setLoading(false);
    } catch (err) {
    console.error('Error fetching profile:', err.response || err.message || err);      setLoading(false);
    }
  }

    fetchProfile();
  }, [profileId]);

  if (!profile) return <p>Loading...</p>;

  const isAdmin = user?.isAdmin;

  return (
    <div className="ProfilePage">
      <aside className="Sidebar">
        <h3>My Info</h3>
        {!isAdmin && (
          <>
            <button>➕Request Service</button>
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
              <li key={idx}>{req.issueSummary} - Status: {req.status}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
