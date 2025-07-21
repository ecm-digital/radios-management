// src/components/device-wizard-steps/ConfirmationStep.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeviceConfig } from './BasicSetupStep';
import { RadioConfig, SsidConfig } from './RadioProvisioningStep';

interface Device {
  name: string;
  model: string;
  mac: string;
  ip: string;
  status: string;
}

interface ConfirmationStepProps {
  selectedDevices: Device[];
  basicConfigs: Record<string, DeviceConfig>;
  radioConfig: RadioConfig;
}

const SummaryItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between py-2 border-b border-dashed">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="text-sm font-medium text-right">{value}</dd>
  </div>
);

export default function ConfirmationStep({ 
  selectedDevices, 
  basicConfigs, 
  radioConfig 
}: ConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Please review all the settings below before applying the configuration. This is the final step.
      </p>
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-4">
        {/* Selected Devices Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Devices ({selectedDevices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-dashed">
              {selectedDevices.map(device => (
                <div key={device.mac} className="py-2 flex justify-between items-center">
                  <span>{basicConfigs[device.mac]?.name || device.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{device.mac}</span>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Radio Provisioning Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Radio Provisioning</CardTitle>
            <CardDescription>Settings applied to all selected devices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(radioConfig).map(([band, config]) => (
              <div key={band}>
                <h4 className="font-semibold mb-2 flex items-center">
                  {band.toUpperCase()} Settings
                  <Badge variant={config.enabled ? 'default' : 'secondary'} className="ml-2">
                    {config.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </h4>
                {config.enabled && (
                  <dl>
                    <SummaryItem label="Channel" value={config.channel} />
                    <SummaryItem label="Channel Width" value={`${config.channelWidth} MHz`} />
                    <SummaryItem label="Transmit Power" value={config.transmitPower} />
                    <h5 className="font-semibold mt-3 mb-1">SSIDs ({config.ssids.length})</h5>
                    {config.ssids.map((ssid: SsidConfig) => (
                      <div key={ssid.id} className="p-2 border-l-2 pl-3 mt-2">
                         <SummaryItem label="SSID Name" value={ssid.name} />
                         <SummaryItem label="Security" value={ssid.security} />
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
