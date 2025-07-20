import { Helmet } from 'react-helmet-async';

export default function UserManagement() {
  return (
    <>
      <Helmet>
        <title>User Management - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions.
          </p>
        </div>
        <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px] bg-card">
          <p className="text-muted-foreground">User management interface will be implemented here.</p>
        </div>
      </div>
    </>
  );
}