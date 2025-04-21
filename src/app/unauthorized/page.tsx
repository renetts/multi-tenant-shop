export default function UnauthorizedPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-600">Unauthorized</h1>
      <p>You must be an admin to view this page.</p>
    </div>
  );
}
