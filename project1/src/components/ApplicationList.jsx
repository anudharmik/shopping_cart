import ApplicationItem from "./ApplicationItem";

export default function ApplicationList({
  applications,
  filter,
  onStatusChange,
  onDelete,
  search,
}) {
  const visibleApplications =
    filter === "All"
      ? applications
      : applications.filter(app => app.status === filter);
 
  const filteredApplications= visibleApplications.filter(app=>
    app.company.toLowerCase().includes(search.toLowerCase()) ||
    app.role.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <ul>
  {filteredApplications.length === 0 ? (
    <p>No applications found</p>
  ) : (
    filteredApplications.map(app => (
      <ApplicationItem
        key={app.id}
        app={app}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    ))
  )}
</ul>
  );
}