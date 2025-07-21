// src/components/device-wizard-steps/DeviceSelectionStep.tsx
import { StatusCheckbox } from '@/components/ui/status-checkbox';
import { AlertBadge } from '@/components/ui/alert-badge';

// Define the shape of a device object
interface Device {
  name: string;
  model: string;
  mac: string;
  ip: string;
  status: string;
}

// Define the props for the component
interface DeviceSelectionStepProps {
  devices: Device[];
  selectedDevices: string[];
  onSelectDevice: (mac: string) => void;
}

export default function DeviceSelectionStep({ 
  devices, 
  selectedDevices, 
  onSelectDevice 
}: DeviceSelectionStepProps) {

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Select the devices you want to configure from the list below. You can select one or multiple devices.
      </p>
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b">
        <div className="col-span-1"></div>
        <div className="col-span-2">Device Name</div>
        <div className="col-span-1">Model</div>
        <div className="col-span-1">MAC Address</div>
        <div className="col-span-1">IP Address</div>
        <div className="col-span-1">Status</div>
      </div>
      
      {/* Table Body */}
      {devices.map((device) => (
        <div key={device.mac} className="grid grid-cols-7 gap-4 items-center py-2 text-sm">
          <div className="col-span-1 flex justify-center">
            <StatusCheckbox 
              variant="success"
              checked={selectedDevices.includes(device.mac)}
              onCheckedChange={() => onSelectDevice(device.mac)}
            />
          </div>
          <div className="col-span-2 font-medium truncate">{device.name}</div>
          <div className="col-span-1 text-muted-foreground truncate">{device.model}</div>
          <div className="col-span-1 text-muted-foreground font-mono text-xs break-words">{device.mac}</div>
          <div className="col-span-1 text-muted-foreground font-mono text-xs break-words">{device.ip}</div>
          <div className="col-span-1">
            <AlertBadge variant="success" className="text-xs">
              {device.status}
            </AlertBadge>
          </div>
        </div>
      ))}
    </div>
  );
}
