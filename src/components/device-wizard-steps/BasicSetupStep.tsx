// src/components/device-wizard-steps/BasicSetupStep.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the shape of a device object
interface Device {
  name: string;
  model: string;
  mac: string;
  ip: string;
  status: string;
}

// Define the shape of the configuration for a single device
export interface DeviceConfig {
  name: string;
  location: string;
  group: string;
}

// Define the props for the component
interface BasicSetupStepProps {
  selectedDevices: Device[];
  configs: Record<string, DeviceConfig>;
  onConfigChange: (mac: string, field: keyof DeviceConfig, value: string) => void;
  errors: Record<string, { name?: string }>;
}

export default function BasicSetupStep({ 
  selectedDevices, 
  configs, 
  onConfigChange,
  errors
}: BasicSetupStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Configure the basic settings for each selected device. These settings will help you identify and organize your network hardware.
      </p>
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-4">
        {selectedDevices.map(device => {
          const config = configs[device.mac] || { name: device.name, location: '', group: '' };
          const deviceErrors = errors[device.mac] || {};
          return (
            <Card key={device.mac} className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{device.name}</CardTitle>
                <p className="text-xs text-muted-foreground font-mono">{device.mac}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`name-${device.mac}`}>Device Name</Label>
                    <Input 
                      id={`name-${device.mac}`}
                      value={config.name}
                      onChange={(e) => onConfigChange(device.mac, 'name', e.target.value)}
                      placeholder="e.g., AP-Floor1-East"
                      className={deviceErrors.name ? 'border-red-500' : ''}
                    />
                    {deviceErrors.name && <p className="text-red-500 text-xs mt-1">{deviceErrors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`location-${device.mac}`}>Location</Label>
                    <Input 
                      id={`location-${device.mac}`}
                      value={config.location}
                      onChange={(e) => onConfigChange(device.mac, 'location', e.target.value)}
                      placeholder="e.g., Floor 1, Office 101"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`group-${device.mac}`}>Group</Label>
                    <Input 
                      id={`group-${device.mac}`}
                      value={config.group}
                      onChange={(e) => onConfigChange(device.mac, 'group', e.target.value)}
                      placeholder="e.g., Main Office"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
