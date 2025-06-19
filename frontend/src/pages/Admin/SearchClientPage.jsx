import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import * as profileService from '../../services/profileService';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Search Clients</h2>

      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name, phone, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto bg-white shadow rounded-lg">
        {filteredProfiles.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProfiles.map((profile) => {
                const address = profile.addresses?.[0];
                const formattedAddress = address
                  ? `${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zip || ''}`
                  : 'N/A';

                return profile?.user ? (
                  <tr
                    key={profile._id}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-blue-700">
                      <Link to={`/profile/${profile._id}`} className="hover:underline">
                        {profile.user.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{formattedAddress}</td>
                    <td className="px-4 py-3 text-gray-700">{profile.user.email}</td>
                    <td className="px-4 py-3 text-gray-700">{profile.phone || 'N/A'}</td>
                  </tr>
                ) : (
                  <tr key={profile._id}>
                    <td colSpan={4} className="px-4 py-3 text-red-600">⚠️ Invalid profile data</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 p-4">No matching clients found.</p>
        )}
      </div>
    </div>
  );
}