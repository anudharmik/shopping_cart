export default function ApplicationForm({
  company,
  role,
  onCompanyChange,
  onRoleChange,
  onSubmit
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
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}