import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import API from "../services/api";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationInsights from "../components/ApplicationInsight";
import { motion } from "framer-motion";

const COLORS = ["#3B82F6", "#FACC15", "#22C55E", "#EF4444"];

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await API.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (id) => {
    const appToEdit = applications.find((app) => app._id === id);
    setEditingApp(appToEdit);
  };

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

  const filterApplications = applications.filter((app) =>
    app.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    app.role.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Future: API search implementation
  // useEffect(() => {
  //   const controller = new AbortController();
  //   API.get(`/applications?search=${debouncedSearch}`, {
  //     signal: controller.signal
  //   });
  //   return () => {
  //     controller.abort();
  //   };
  // }, [debouncedSearch]);

  const stats = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
  );

  const chartData = [
    { name: "Applied", value: stats.Applied },
    { name: "Interview", value: stats.Interview },
    { name: "Offer", value: stats.Offer },
    { name: "Rejected", value: stats.Rejected },
  ];




  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ApplicationInsights
          stats={stats}
          chartData={chartData}
          COLORS={COLORS}
        />
        <div className="flex justify-center items-center m-2">
          <input
            type="text"
            placeholder="Search applications..."
            className="mb-4 p-2 border border-gray-300 placeholder:text-gray-400 text-white rounded-lg w-full md:w-1/2 bg-gray-700 hover:border-blue-600 focus:border-blue-600 focus:outline-none transition duration-300 ease-in-out"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <h2 className="
            text-3xl md:text-4xl font-extrabold tracking-tight
            bg-linear-to-r from-gray-400 via-amber-300 to-white
            bg-clip-text text-transparent
          ">
            Your Applications
          </h2>

          <div className="
            mt-2 h-[3px] w-24
            bg-linear-to-r from-gray-500 to-amber-500
            rounded-full
          "/>
        </motion.div>


        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform  mb-4"
          onClick={() => setShowApplication(true)}
        >
          + Add Application
        </button>

        {loading && <p className="text-white">Loading...</p>}

        {!loading && applications.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No applications found 😕</p>
            <p className="text-sm">Try adding or changing filters</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterApplications.map((app) => (
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
          state={"Added"}
          onClose={() => setShowApplication(false)}
          onSuccess={(newApp) => {
            setApplications((prev) => [newApp, ...prev]);
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
            setApplications((prev) =>
              prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
            );
            setEditingApp(null);
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
