import { Helmet } from 'react-helmet-async';

export default function NetworkMap() {
  return (
    <>
      <Helmet>
        <title>Network Map - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Network Map</h1>
          <p className="text-muted-foreground">
            Interactive visualization of your network devices and connections.
          </p>
        </div>
        <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px] bg-card">
          <p className="text-muted-foreground">Network map visualization will be implemented here.</p>
        </div>
      </div>
    </>
  );
}