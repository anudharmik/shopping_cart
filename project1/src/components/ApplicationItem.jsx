export default function ApplicationItem({
  app,
  onStatusChange,
  onDelete
}) {
  return (
    <li>
      <b>{app.company}</b> — {app.role}

      <select
        value={app.status}
        onChange={e => onStatusChange(app.id, e.target.value)}
        style={{ marginLeft: "10px" }}
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
    </li>
  );
}