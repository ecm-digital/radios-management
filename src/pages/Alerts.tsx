import { Helmet } from 'react-helmet-async';

export default function Alerts() {
  return (
    <>
      <Helmet>
        <title>Alerts - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and manage network alerts and notifications.
          </p>
        </div>
        <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px] bg-card">
          <p className="text-muted-foreground">Alerts management interface will be implemented here.</p>
        </div>
      </div>
    </>
  );
}