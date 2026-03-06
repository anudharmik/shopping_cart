import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import "./index.css" ;


export default function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //"single source of truth" 
  //that's why we define following three states here and pass them down as props to ApplicationForm
  const [company,setCompany]=useState("");
  const [role,setRole]=useState("");
  const [notes,setNotes]=useState("");

  const [user,setUser]=useState(null);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const [deadline,setDeadline]=useState("");
  const [search,setSearch]=useState("");

  const [filter,setFilter]=useState("All");
  //if i want to persist filter state, i can use local storage and useEffect to save and load it (less advisable)
  //better options to persist filter state: use URL query parameters(e.g. ?filter=Interview) and read it on load, update it on change

  const [authLoading,setAuthLoading]=useState(true); //to handle flicker and ensure our UI waits for supabase to restore the session

  const stats={
    Applied:applications.filter(a=>a.status==="Applied").length,
    Interview:applications.filter(a=>a.status==="Interview").length,
    Offer:applications.filter(a=>a.status==="Offer").length,
    Rejected:applications.filter(a=>a.status==="Rejected").length,
  }


  useEffect(() => {
    if(user){
    fetchApplications();
    }
  }, [user]);



  useEffect(()=>{
    const getSession=async ()=>{
      const {data}= await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    };
    getSession();
    const {data : listener}=supabase.auth.onAuthStateChange(
      (_event,session)=>{
        setUser(session?.user?? null);
      }
    );
    return ()=>{
      listener.subscription.unsubscribe();
    };
  },[]);



  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id",user.id)
      .order("deadline", { ascending: true ,nullsLast:true});
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
        notes,
        user_id:user.id,
        deadline: deadline ||null, 
      }
    ]);

    if(error){
      setError(error.message);
    }else{
      setCompany("");
      setRole("");
      setNotes("");
      setDeadline("");
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
    
    async function handleSignup(){
      const{error}=await supabase.auth.signUp({
        email,
        password
      });
      if(error){
        alert(error.message);
      }else{
        alert("Signup successuful! Check your mail");
      } 
    } 


    async function handleLogin(){
      const{error}=await supabase.auth.signInWithPassword({
        email,
        password
      });
      if(error){
        alert(error.message);
      }
    }

    
    async function handleLogout(){
      await supabase.auth.signOut();
    }


  if(authLoading){
    return <p>Loading session...</p>;
  }
  

  if (!user) {
  return (
    <div style={{ 
    padding: "30px" ,
    maxWidth:"400px",
    margin:"100px auto",
    textAlign:"center",
    border:"1px solid #ddd",
    borderRadius:"10px",
    fontFamily:"system-ui, -apple-system, sans-serif",
    }}>
      <h1>Job Tracker Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{width:"100%",marginBottom:"10px",padding :"8px"}}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{width:"100%",marginBottom:"10px",padding :"8px"}}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup} style={{ marginLeft: "10px" }}>
        Sign Up
      </button>
    </div>
    );
  }
  return (
    
    <div style={{ 
    padding: "20px" ,
    maxWidth:"800px",
    margin:"40px auto",
    fontFamily:"Arial, -apple-system, sans-serif",
    }}>
      

      <b><h1>Job Application Tracker</h1></b>
      
      <div style={{ marginBottom: "20px" }}>
        <p>Logged in as {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ApplicationForm
        company={company}
        role={role}
        deadline={deadline}
        notes={notes}
        onCompanyChange={setCompany}
        onRoleChange={setRole}
        onNotesChange={setNotes}
        onSubmit={handleSubmit}
        onDeadlineChange={setDeadline}
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

      {loading && <p>Fetching your applications...</p>}

      {error && <p style ={{color:"magenta"}}>{error}</p>}


      <input
      type="text"
      placeholder="Search by company or role..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      style={{marginBottom:"15px",padding :"6px",width:"100%"}}
      />

      <ApplicationList 
        applications={applications}
        filter={filter}
        onStatusChange={updateStatus}
        onDelete={deleteApplication}
        search={search}
      />
      
    </div>
  );
}