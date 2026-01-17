import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import API from "../services/api";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [editingApp, setEditingApp] = useState(null)

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
  
    try {
      await API.delete(`/applications/${id}`);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };
  
  const handleEdit= (id) => { 
    const appToEdit = applications.find(app => app._id === id);
    setEditingApp(appToEdit);
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await API.get("/applications");
        setApplications(res.data.applications || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Your Applications 📁
        </h2>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 mb-4"
          onClick={() => setShowApplication(true)}
        >
          + Add Application
        </button>

        {loading && <p>Loading...</p>}

        {!loading && applications.length === 0 && (
          <p className="text-gray-600">
            No applications found. Add one tomorrow! ✨
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <ApplicationCard 
            key={app._id} 
            app={app} 
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      {showApplication && (
        <ApplicationForm
          title="Add New Application"
          state={"Submitted"}
          onClose={() => setShowApplication(false)}
          onSuccess={(newApp) => {
            setApplications(prev => [newApp, ...prev]);
            setShowApplication(false);
          }}
        />
      )}

      {editingApp && (
        <ApplicationForm
          title="Update Application"
          state={"Updated"}
          initialData={editingApp}
          onClose={() => setEditingApp(null)}
          onSuccess={(updatedApp) => {
            setApplications(prev => prev.map(app => app._id === updatedApp._id ? updatedApp : app));
            setEditingApp(null);
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
