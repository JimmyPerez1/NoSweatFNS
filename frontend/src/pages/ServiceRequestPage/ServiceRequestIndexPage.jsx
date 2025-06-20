import { useEffect, useState } from 'react';
import * as requestService from '../../services/requestService';
import { Link } from 'react-router';


export default function ServiceRequestIndexPage() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    async function fetchAllRequests() {
      try {
        const data = await requestService.getRequests();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching service requests:', err);
      }
    }

    fetchAllRequests();
  }, []);

  useEffect(() => {
    let filtered = [...requests];

    // Work Order or Client search
    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(req =>
        req.workOrderNumber?.toLowerCase().includes(term) ||
        req.profile?.user?.name?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Date range filter
    if (fromDate) {
      filtered = filtered.filter(req => new Date(req.requestedDate) >= new Date(fromDate));
    }
    if (toDate) {
      filtered = filtered.filter(req => new Date(req.requestedDate) <= new Date(toDate));
    }

    setFilteredRequests(filtered);
  }, [search, statusFilter, fromDate, toDate, requests]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Service Requests</h2>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Work Order # or Client"
            className="border rounded px-3 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Date</th>
                <th className="text-left p-2 border">Work Order #</th>
                <th className="text-left p-2 border">Issue Summary</th>
                <th className="text-left p-2 border">Status</th>
                <th className="text-left p-2 border">Client</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req._id} className="border-t hover:bg-blue-50">
                    <td className="p-2">{new Date(req.requestedDate).toLocaleDateString()}</td>
                    <td className="p-2 text-blue-600 underline">
                      <Link to={`/requests/${req._id}`}>
                        {req.workOrderNumber || 'N/A'}
                      </Link>
                    </td>
                    <td className="p-2">{req.issueSummary}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
    ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          req.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            req.status === 'completed' ? 'bg-green-100 text-green-800' :
                              req.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-2 text-blue-600 underline">
                      {req.profile ? (
                        <Link to={`/profile/${req.profile._id}`}>
                          {req.profile.user?.name || 'View'}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-4">
                    No service requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}