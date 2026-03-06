export default function ApplicationItem({
  app,
  onStatusChange,
  onDelete
}) {

  function getStatusColor(status){
      switch (status)
    {
      case "Applied":
        return "#2563eb";
      case "Interview":
        return "#f59e0b";
      case "Offer":
        return "#16a34a";
      case "Rejected":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  }

{
  return (
    <li>
      <b>{app.company}</b> — {app.role}

      {app.deadline && (
        <p style={{fontSize:"14px",color:"darkred"}}>
          Deadline: {app.deadline}
        </p>
      )}

      {app.notes && (
        <p style={{ fontSize:"14px",color:"gray"}}>{app.notes}</p>
      )}

      <select
        value={app.status}
        onChange={e => onStatusChange(app.id, e.target.value)}
        style={{ 
          marginLeft: "10px",
          padding:"4px 8px",
          borderRadius :"6px",
          border:"none",
          backgroundColor:getStatusColor(app.status),
          color:"white"
        }}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button
        onClick={() => onDelete(app.id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
      
      <hr style={{marginTop:"10px",marginBottom:"10px"}}></hr>
      

    </li>
  );
}
}