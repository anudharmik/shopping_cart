import ApplicationItem from "./ApplicationItem";

export default function ApplicationList({
  applications,
  filter,
  onStatusChange,
  onDelete
}) {
  const visibleApplications =
    filter === "All"
      ? applications
      : applications.filter(app => app.status === filter);

  if (visibleApplications.length === 0) {
    return <p>No applications found</p>;
  }

  return (
    <ul>
      {visibleApplications.map(app => (
        <ApplicationItem
          key={app.id}
          app={app}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}