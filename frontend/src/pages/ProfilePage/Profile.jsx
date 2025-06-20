import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import ServiceRequestForm from '../../components/ServiceRequestForm/ServiceRequestForm';
import { createRequest } from '../../services/requestService';
import * as profileService from '../../services/profileService';
import Modal from '../../components/Modal/Modal';
import DragAndDropUploader from '../../components/DragAndDropUploader/DragAndDropUploader';
import { signIn } from '../../services/documentService'


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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-4 space-y-4">
        <h3 className="text-lg font-bold text-gray-700">My Info</h3>

        {!isAdmin && (
          <div className="space-y-2">
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ➕ Request Service
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              💲 Make a Payment
            </button>
          </div>
        )}

        {isAdmin && (
          <div className="space-y-2">
            <Link to="/admin/search">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-orange-600">
                🔎 Search Clients
              </button>
            </Link>
            <Link to="/requests">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-orange-600">
                🔎 View Requests
              </button>
            </Link>
            <button
              onClick={signIn}
              className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              🔐 Login to Supabase
            </button>
          </div>
        )}
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 space-y-8">
        <h2 className="text-3xl font-bold text-blue-800">My Dashboard</h2>

        {/* Client Info */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Client Info</h3>
            <button className="bg-gray-800 text-white px-3 py-1 rounded">Edit</button>
          </div>
          <p><strong>Name:</strong> {profile.user.name}</p>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {profile.addresses.map((addr, idx) => (
              <li key={idx}>
                {addr.label}: {addr.street}, {addr.city}, {addr.state} {addr.zip}
              </li>
            ))}
          </ul>
        </section>

        {/* Appliances Panel */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Appliances & Warranty Info</h3>
            {isAdmin && (
              <div className="space-x-2">
                <button className="bg-gray-800 text-white px-3 py-1 rounded">➕ Add New</button>
              </div>
            )}
          </div>
          {profile.appliances.length ? (
            <ul className="list-disc pl-5 text-gray-700">
              {profile.appliances.map((appliance, idx) => (
                <li key={idx}>
                  {appliance.brand} {appliance.type} – Last Serviced:{' '}
                  {new Date(appliance.lastServiced).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No Appliances Listed.</p>
          )}
        </section>

        {/* Documents Panel */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
            {isAdmin && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedDocType('');
                    setSelectedWorkOrder('');
                    setShowUploader(true);
                  }}
                  className="bg-gray-800 text-white px-3 py-1 rounded" >
                  ➕ Add New
                </button>
              </div>
            )}
          </div>
          {profile.documents?.filter(doc => doc.type !== 'Invoice').length ? (
            <table className="w-full text-left border mt-2 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Document Name</th>
                  <th className="p-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {profile.documents
                  .filter(doc => doc.type !== 'Invoice')
                  .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                  .map((doc, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                      <td className="p-2 text-blue-700 underline">
                        <a href={doc.url} target="_blank" rel="noreferrer">
                          {decodeURIComponent(doc.url.split('/').pop())}
                        </a>
                      </td>
                      <td className="p-2">{doc.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No Documents Listed.</p>
          )}
        </section>

        {/* Invoices Panel */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Invoices</h3>
            {isAdmin && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedDocType('');
                    setSelectedWorkOrder('');
                    setShowUploader(true);
                  }}
                  className="bg-gray-800 text-white px-3 py-1 rounded">
                  ➕ Add New
                </button>
              </div>
            )}
          </div>
          {profile.documents?.filter(doc => doc.type === 'Invoice').length ? (
            <table className="w-full text-left border mt-2 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Document Name</th>
                  <th className="p-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {profile.documents
                  .filter(doc => doc.type === 'Invoice')
                  .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                  .map((doc, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                      <td className="p-2 text-blue-700 underline">
                        <a href={doc.url} target="_blank" rel="noreferrer">
                          {decodeURIComponent(doc.url.split('/').pop())}
                        </a>
                      </td>
                      <td className="p-2">{doc.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No Invoices Listed.</p>
          )}
        </section>

        {/* Service Binder Panel */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">Service Binder</h3>
            {isAdmin && (
              <div className="space-x-2">
                <button
                onClick={() => setShowRequestForm(true)}
                 className="bg-gray-800 text-white px-3 py-1 rounded">➕ Add New</button>
              </div>
            )}
          </div>
          {profile.serviceRequests.length ? (
            <table className="w-full text-left border mt-2 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Work Order #</th>
                  <th className="p-2">Issue Summary</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.serviceRequests.map((req, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{new Date(req.requestedDate).toLocaleDateString()}</td>
                    <td className="p-2">{req.workOrderNumber || 'N/A'}</td>
                    <td className="p-2 text-blue-700 underline">
                      <Link to={`/requests/${req._id}`}>
                        {req.issueSummary}
                      </Link>
                    </td>
                    <td className="p-2">{req.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No service requests yet.</p>
          )}
        </section>
      </main>

      {/* Modals */}
      {showUploader && (
        <Modal onClose={() => setShowUploader(false)}>

          <div className="p-4 space-y-4">
            <h4 className="text-lg font-bold">Upload New {selectedDocType || 'File'}</h4>
            <label className="block">
              Work Order #
              <select
                value={selectedWorkOrder}
                onChange={(e) => setSelectedWorkOrder(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="">-- Select --</option>
                {profile.serviceRequests.map((req) => (
                  <option key={req._id} value={req.workOrderNumber}>
                    {req.workOrderNumber || `#${req._id.slice(-4)} (No Number)`}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              Document Type
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="">-- Select Type --</option>
                <option value="Invoice">Invoice</option>
                <option value="Contract">Contract</option>
                <option value="Estimates">Estimates</option>
                <option value="Warranty">Warranty</option>
                <option value="WorkOrderForm">WorkOrderForm</option>
              </select>
            </label>
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
              <p className="text-red-600">Please select a document type to continue.</p>
            )}
          </div>
        </Modal>
      )}

      {showRequestForm && (
        <ServiceRequestForm
          onSubmit={handleCreateRequest}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
}

