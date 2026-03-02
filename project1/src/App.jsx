import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company,setCompany]=useState("");
  const [role,setRole]=useState("");
  const [filter,setFilter]=useState("All");
  const visibleApplications =filter === "All" ? applications : applications.filter(app => app.status === filter);

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
  
    async function updateStatus(id,newStatus){
      const {error}=await supabase
      .from("applications")
      .update({status:newStatus})
      .eq("id",id);

      if(error){
        setError(error.message);
      }else{
        setApplications(prev=>
          prev.map(app=>
            app.id=== id ? {...app,status:newStatus}:app
          )
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

    <select
    value={filter}
    onChange={e => setFilter(e.target.value)}
    style={{ marginBottom: "10px" }}
    >
    <option value="All">All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
    </select>

      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && visibleApplications.length === 0 && (
        <p>No applications yet</p>
      )}

      <ul>
        {visibleApplications.map(app => (
              <li key={app.id}>
              <b>{app.company}</b> — {app.role}

              <select
                value={app.status}
                onChange={e =>
                  updateStatus(app.id, e.target.value)
                }
                style={{ marginLeft: "10px" }}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>

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