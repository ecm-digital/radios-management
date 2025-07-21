// src/components/device-wizard-steps/RadioProvisioningStep.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Wifi } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Updated data structures to match the new design
export interface SsidConfig {
  id: string;
  enabled: boolean;
  name: string;
  security: 'open' | 'wpa2' | 'wpa3' | 'wpa3-personal';
  password?: string;
  broadcast: boolean;
}

export interface RadioBandConfig {
  enabled: boolean;
  channel: string;
  channelWidth: string;
  transmitPower: string;
  operationMode: 'ap' | 'mesh';
  radioProtocol: 'ax' | 'ac' | 'n';
  ssids: SsidConfig[];
}

export interface RadioConfig {
  '2.4ghz': RadioBandConfig;
  '5ghz': RadioBandConfig;
  '6ghz': RadioBandConfig;
}

// Validation error types
interface SsidErrors {
  name?: string;
  password?: string;
}
interface RadioBandErrors {
  ssids?: Record<string, SsidErrors>;
}
export interface RadioValidationErrors {
  '2.4ghz'?: RadioBandErrors;
  '5ghz'?: RadioBandErrors;
  '6ghz'?: RadioBandErrors;
}

// Props including selected devices for the summary table
export interface RadioProvisioningStepProps {
  config: RadioConfig;
  onConfigChange: (newConfig: RadioConfig) => void;
  errors: RadioValidationErrors;
  selectedDevices: { name: string; model: string; mac: string; ip: string; status: string }[];
}

export default function RadioProvisioningStep({ config, onConfigChange, errors, selectedDevices }: RadioProvisioningStepProps) {
  const [selectedBand, setSelectedBand] = useState<keyof RadioConfig>('2.4ghz');

  const handleBandConfigChange = (field: keyof Omit<RadioBandConfig, 'ssids'>, value: any) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    newConfig[selectedBand][field] = value;
    onConfigChange(newConfig);
  };

  const handleSsidChange = (ssidIndex: number, field: keyof SsidConfig, value: any) => {
    const newConfig = JSON.parse(JSON.stringify(config)); // Deep copy to avoid mutation issues
    newConfig[selectedBand].ssids[ssidIndex][field] = value;
    onConfigChange(newConfig);
  };

  const addSsid = () => {
    const newSsid: SsidConfig = {
      id: `ssid-${Date.now()}`,
      enabled: true,
      name: 'New SSID',
      security: 'wpa3-personal',
      password: '',
      broadcast: true,
    };
    const newConfig = JSON.parse(JSON.stringify(config));
    newConfig[selectedBand].ssids.push(newSsid);
    onConfigChange(newConfig);
  };

  const currentBandConfig = config[selectedBand];
  const primarySsid = currentBandConfig.ssids[0];
  const primarySsidErrors = errors[selectedBand]?.ssids?.[primarySsid?.id] || {};

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Radio Configuration</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <Label>Frequency Band</Label>
            <Select value={selectedBand} onValueChange={(val: keyof RadioConfig) => setSelectedBand(val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2.4ghz">2.4 GHz</SelectItem>
                <SelectItem value="5ghz">5 GHz</SelectItem>
                <SelectItem value="6ghz">6 GHz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Channel</Label>
            <Select value={currentBandConfig.channel} onValueChange={(val) => handleBandConfigChange('channel', val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Channel Width</Label>
            <Select value={currentBandConfig.channelWidth} onValueChange={(val) => handleBandConfigChange('channelWidth', val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 MHz</SelectItem>
                <SelectItem value="40">40 MHz</SelectItem>
                <SelectItem value="80">80 MHz</SelectItem>
                <SelectItem value="160">160 MHz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Transmit Power</Label>
            <Select value={currentBandConfig.transmitPower} onValueChange={(val) => handleBandConfigChange('transmitPower', val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Operation Mode</Label>
            <Input readOnly value="Access Point" />
          </div>
          <div className="space-y-1.5">
            <Label>Radio Protocol</Label>
            <Select value={currentBandConfig.radioProtocol} onValueChange={(val) => handleBandConfigChange('radioProtocol', val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ax">802.11ax (Wi-Fi 6)</SelectItem>
                <SelectItem value="ac">802.11ac (Wi-Fi 5)</SelectItem>
                <SelectItem value="n">802.11n (Wi-Fi 4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {primarySsid && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              <CardTitle>Primary SSID</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="enable-primary-ssid">Enabled</Label>
              <Switch id="enable-primary-ssid" checked={primarySsid.enabled} onCheckedChange={(val) => handleSsidChange(0, 'enabled', val)} />
            </div>
          </CardHeader>
          <CardContent className={`space-y-6 ${!primarySsid.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>SSID Name</Label>
                <Input value={primarySsid.name} onChange={(e) => handleSsidChange(0, 'name', e.target.value)} className={primarySsidErrors.name ? 'border-red-500' : ''} />
                {primarySsidErrors.name && <p className="text-red-500 text-xs mt-1">{primarySsidErrors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Broadcast SSID</Label>
                <Select value={primarySsid.broadcast ? 'yes' : 'no'} onValueChange={(val) => handleSsidChange(0, 'broadcast', val === 'yes')}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Security</Label>
                <Select value={primarySsid.security} onValueChange={(val) => handleSsidChange(0, 'security', val)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wpa3-personal">WPA3-Personal</SelectItem>
                    <SelectItem value="wpa2">WPA2</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {primarySsid.security !== 'open' && (
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" value={primarySsid.password} onChange={(e) => handleSsidChange(0, 'password', e.target.value)} className={primarySsidErrors.password ? 'border-red-500' : ''} />
                  {primarySsidErrors.password && <p className="text-red-500 text-xs mt-1">{primarySsidErrors.password}</p>}
                </div>
              )}
            </div>
            <div>
              <Button variant="link" className="p-0 h-auto">+ Add Advanced Settings</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button variant="outline" onClick={addSsid}><Plus className="h-4 w-4 mr-2" /> Add Additional SSID</Button>

       <Card>
        <CardHeader><CardTitle>Device Summary</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>MAC Address</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedDevices.map(device => (
                <TableRow key={device.mac}>
                  <TableCell>{device.name || 'N/A'}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{device.mac}</TableCell>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell><Badge variant={device.status === 'Ready' ? 'success' : 'secondary'}>{device.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
