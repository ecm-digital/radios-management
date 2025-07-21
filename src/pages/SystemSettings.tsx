import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function SystemSettings() {
  return (
    <>
      <Helmet>
        <title>System Settings - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure global system settings, integrations, and data management.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage basic system parameters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc-5">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="utc+1">UTC+1 (Central European Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="hostname">System Hostname</Label>
                <Input id="hostname" defaultValue="radiance-nms-prod" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMTP Configuration</CardTitle>
            <CardDescription>Configure email server for notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="smtp-server">SMTP Server</Label>
              <Input id="smtp-server" placeholder="smtp.example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="smtp-port">Port</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-user">Username</Label>
                <Input id="smtp-user" placeholder="user@example.com" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
            <CardDescription>Manage how long data is stored.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="retention-period">Log Retention Period (days)</Label>
              <Input id="retention-period" type="number" defaultValue={90} className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-pruning">Enable Automatic Data Pruning</Label>
              <Switch id="auto-pruning" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </div>
    </>
  );
}