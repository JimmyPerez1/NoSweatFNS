import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as profileService from '../../services/profileService';
import './SearchClientsPage.css';

export default function SearchClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const allProfiles = await profileService.getAllProfiles();
        setProfiles(allProfiles);
        setFilteredProfiles(allProfiles);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    }

    fetchProfiles();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = profiles.filter((profile) => {
      const userName = profile?.user?.name?.toLowerCase() || '';
      const userEmail = profile?.user?.email?.toLowerCase() || '';
      const phone = profile?.phone?.toLowerCase() || '';
      const addressMatch = profile?.addresses?.some((addr) =>
        Object.values(addr).some(val =>
          val?.toLowerCase().includes(term)
        )
      );

      return (
        userName.includes(term) ||
        userEmail.includes(term) ||
        phone.includes(term) ||
        addressMatch
      );
    });
    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);

  return (
    <div className="SearchClientsPage">
      <h2>Search Clients</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, phone, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="search-results">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => {
            return profile?.user ? (
              <Link
                to={`/profile/${profile._id}`}
                className="result-card"
                key={profile._id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{profile.user.name}</h3>
                <p><strong>Email:</strong> {profile.user.email}</p>
                <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                <ul>
                  {profile.addresses?.map((addr, idx) => (
                    <li key={idx}>
                      {addr.label || 'Label'}: {addr.street || 'Street'}, {addr.city || 'City'}, {addr.state || 'State'} {addr.zip || 'ZIP'}
                    </li>
                  ))}
                </ul>
              </Link>
            ) : (
              <div key={profile._id} className="result-card">
                <p>⚠️ Invalid profile data</p>
              </div>
            );
          })
        ) : (
          <p>No matching clients found.</p>
        )}
      </div>
    </div>
  );
}