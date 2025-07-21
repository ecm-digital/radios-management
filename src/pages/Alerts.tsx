import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

const alerts = [
  {
    severity: "Critical",
    message: "Core router offline: R1-Core is unreachable.",
    timestamp: "2023-10-27 10:45:12",
    status: "Active",
  },
  {
    severity: "Warning",
    message: "High latency detected on AP-3 in Sector B.",
    timestamp: "2023-10-27 10:42:30",
    status: "Active",
  },
  {
    severity: "Info",
    message: "Firmware update available for switch SW-L2-4.",
    timestamp: "2023-10-27 09:15:00",
    status: "Acknowledged",
  },
  {
    severity: "Warning",
    message: "DHCP pool for VLAN 20 is 85% full.",
    timestamp: "2023-10-26 18:30:05",
    status: "Active",
  },
  {
    severity: "Critical",
    message: "Firewall policy violation: Unauthorized access attempt from 10.1.1.50.",
    timestamp: "2023-10-26 15:20:11",
    status: "Resolved",
  },
];

const getBadgeVariant = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'Warning':
      return 'secondary';
    default:
      return 'default';
  }
};

export default function Alerts() {
  return (
    <>
      <Helmet>
        <title>Alerts - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Network Alerts</h1>
            <p className="text-muted-foreground">
              Monitor and manage network alerts and notifications.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button>Acknowledge All</Button>
          </div>
        </div>

        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Severity</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant={getBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{alert.message}</TableCell>
                    <TableCell className="text-muted-foreground">{alert.timestamp}</TableCell>
                    <TableCell>{alert.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}