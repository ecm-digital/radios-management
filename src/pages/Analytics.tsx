import { Helmet } from 'react-helmet-async';

export default function Analytics() {
  return (
    <>
      <Helmet>
        <title>Analytics - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Analyze network performance and usage statistics.
          </p>
        </div>
        <div className="border rounded-lg p-8 flex items-center justify-center min-h-[500px] bg-card">
          <p className="text-muted-foreground">Analytics charts and reports will be implemented here.</p>
        </div>
      </div>
    </>
  );
}