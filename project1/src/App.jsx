import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import "./index.css" ;

export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company,setCompany]=useState("");
  const [role,setRole]=useState("");

  const [filter,setFilter]=useState("All");
  //if i want to persist filter state, i can use local storage and useEffect to save and load it (less advisable)
  //better options to persist filter state: use URL query parameters(e.g. ?filter=Interview) and read it on load, update it on change

  const stats={
    Applied:applications.filter(a=>a.status==="Applied").length,
    Interview:applications.filter(a=>a.status==="Interview").length,
    Offer:applications.filter(a=>a.status==="Offer").length,
    Rejected:applications.filter(a=>a.status==="Rejected").length,
  }

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
        status:"Applied",
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
    <div style={{ 
    padding: "20px" ,
    maxWidth:"800px",
    margin:"40px auto",
    fontFamily:"Arial, -apple-system, sans-serif",
    }}>
      <h1>Job Application Tracker</h1>
      
      <ApplicationForm
        company={company}
        role={role}
        onCompanyChange={setCompany}
        onRoleChange={setRole}
        onSubmit={handleSubmit}
      />
    
    <div style={{
      display:"flex",
      gap:"10px",
      marginBottm:"20px",
      flexWrap:"wrap"
    }}
    >
      {Object.entries(stats).map(([key,value]) =>
        <div 
          key={key}
          style={{
          padding:"8px 12px",
          borderRadius :"8px",
          background:"#f3f4f6",
          fontSize:"14px",
          fontWeight:"bold",
        }}
        >
          <strong>{key}:</strong> {value}
        </div>
      )}
    </div>

      <select
        value={filter}
        onChange={e=>setFilter(e.target.value)}
        style={{marginBottom:"20px"}}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style ={{color:"magenta"}}>{error}</p>}

      <ApplicationList 
        applications={applications}
        filter={filter}
        onStatusChange={updateStatus}
        onDelete={deleteApplication}
      />
      
    </div>
  );
}