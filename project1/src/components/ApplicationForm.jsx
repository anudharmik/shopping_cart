
export default function ApplicationForm({
  company,
  role,
  onCompanyChange,
  onRoleChange,
  onSubmit,
  notes,
  onNotesChange,
  deadline,
  onDeadlineChange
}) {

 

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Company"
        value={company}
        onChange={e => onCompanyChange(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={e => onRoleChange(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <textarea
      placeholder="Notes (optional)"
      value={notes}
      onChange={(e)=> onNotesChange(e.target.value)}
      style={{display:"block",marginTop:"10px",width:"100px"}}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => onDeadlineChange(e.target.value)}
        style={{display :"block",marginTop:"10px"}}
      />

     <button type="submit" style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}