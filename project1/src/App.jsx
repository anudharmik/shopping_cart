import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company,setCompany]=useState("");
  const [role,setRole]=useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setApplications(data);
    }

    setLoading(false);
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(!company || !role) return ;

    const {error}=await supabase
    .from("applications")
    .insert([
      {
        company,
        role,
        status:"applied",
      }
    ]);

    if(error){
      setError(error.message);
    }else{
      setCompany("");
      setRole("");
      fetchApplications(); //refresh list
    }
  }
    
    async function deleteApplication(id){
      const{error}=await supabase
      .from("applications")
      .delete()
      .eq("id",id);

      if(error){
        setError(error.message);
      }else{
        setApplications(prev=>
          prev.filter(app=>app.id !==id)
        );
      }
      }
  

  


  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
  <input
    placeholder="Company"
    value={company}
    onChange={e => setCompany(e.target.value)}
  />
  <input
    placeholder="Role"
    value={role}
    onChange={e => setRole(e.target.value)}
    style={{ marginLeft: "10px" }}
  />
  <button type="submit" style={{ marginLeft: "10px" }}>
    Add
  </button>
</form>

      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && applications.length === 0 && (
        <p>No applications yet</p>
      )}

      <ul>
        {applications.map(app => (
          <li key={app.id}>
            <b>{app.company}</b> — {app.role} ({app.status})
            <button
              onClick={() => deleteApplication(app.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}