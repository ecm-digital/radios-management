import { useState } from "react"
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertBadge } from "@/components/ui/alert-badge"
import { StatusCheckbox } from "@/components/ui/status-checkbox"
import "../styles/alert-colors.css"
import "../styles/wizard-steps.css"
import "../styles/ant-forms.css"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Download,
  Plus,
  Radio,
  Check
} from "lucide-react"
import { WizardSteps } from "@/components/ui/wizard-steps"
import { AntInput } from "@/components/ui/ant-input"
import { AntSelect } from "@/components/ui/ant-select"
import { AntSwitch } from "@/components/ui/ant-switch"
import { AntRadio } from "@/components/ui/ant-radio"

const steps = [
  { id: 1, title: "Device Selection", status: "completed" },
  { id: 2, title: "Basic Setup", status: "completed" },
  { id: 3, title: "Radio Provisioning", status: "current" },
  { id: 4, title: "Confirmation", status: "pending" }
]

const devices = [
  {
    name: "AP-Floor1-East",
    model: "RD-8200",
    mac: "00:11:22:33:44:55",
    ip: "192.168.1.10",
    status: "Ready"
  },
  {
    name: "AP-Floor1-West", 
    model: "RD-8200",
    mac: "00:11:22:33:44:56",
    ip: "192.168.1.11",
    status: "Ready"
  },
  {
    name: "AP-Floor2-Center",
    model: "RD-9100", 
    mac: "00:11:22:33:44:57",
    ip: "192.168.1.12",
    status: "Ready"
  }
]

export default function DeviceWizard() {
  const [currentStep, setCurrentStep] = useState(3)
  const [ssidEnabled, setSsidEnabled] = useState(true)

  // Funkcja do nawigacji między krokami
  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
      
      // Aktualizacja statusów kroków
      const updatedSteps = steps.map(s => ({
        ...s,
        status: s.id < step ? "completed" : s.id === step ? "current" : "pending"
      }));
      setStepsList(updatedSteps);
    }
  }
  
  // Stan dla kroków
  const [stepsList, setStepsList] = useState(steps);

  return (
    <>
      <Helmet>
        <title>Device Wizard - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-foreground">Device Wizard</h1>
          <p className="text-muted-foreground">Configure radio parameters for your selected devices</p>
        </div>

        {/* Progress Steps */}
        <WizardSteps 
          steps={stepsList}
          onStepClick={(stepId) => goToStep(stepId)}
        />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2">
          <Card className="border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Step {currentStep}: {stepsList[currentStep - 1].title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy from Template
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">
                Configure the radio parameters for your selected devices. These settings will determine how your devices communicate on the network.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">

              {/* Radio Configuration */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Radio Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <AntSelect
                      label="Frequency Band"
                      id="frequency"
                      defaultValue="2.4ghz"
                      options={[
                        { value: "2.4ghz", label: "2.4 GHz" },
                        { value: "5ghz", label: "5 GHz" }
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="channel">Channel</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="width">Channel Width</Label>
                    <Select defaultValue="20mhz">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20mhz">20 MHz</SelectItem>
                        <SelectItem value="40mhz">40 MHz</SelectItem>
                        <SelectItem value="80mhz">80 MHz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">Transmit Power</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Operation Mode</Label>
                    <Select defaultValue="ap">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ap">Access Point</SelectItem>
                        <SelectItem value="station">Station</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protocol">Radio Protocol</Label>
                    <Select defaultValue="802.11ax">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="802.11ax">802.11ax (Wi-Fi 6)</SelectItem>
                        <SelectItem value="802.11ac">802.11ac (Wi-Fi 5)</SelectItem>
                        <SelectItem value="802.11n">802.11n (Wi-Fi 4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* SSID Configuration */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">SSID Configuration</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Radio className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Primary SSID</p>
                        <p className="text-sm text-muted-foreground">Main network access point</p>
                      </div>
                    </div>
                    <Switch 
                      checked={ssidEnabled} 
                      onCheckedChange={setSsidEnabled}
                    />
                  </div>

                  {ssidEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="ssid-name">SSID Name</Label>
                        <Input 
                          id="ssid-name" 
                          defaultValue="Radiance-Network" 
                          placeholder="Enter SSID name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="broadcast">Broadcast SSID</Label>
                        <Select defaultValue="yes">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="security">Security</Label>
                        <Select defaultValue="wpa3">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wpa3">WPA3-Personal</SelectItem>
                            <SelectItem value="wpa2">WPA2-Personal</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          defaultValue="••••••••••••" 
                          placeholder="Enter password"
                        />
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Additional SSID
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Summary */}
        <div>
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Device Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b">
                  <div className="col-span-2">Device Name</div>
                  <div>Model</div>
                  <div>MAC Address</div>
                  <div>IP Address</div>
                  <div>Status</div>
                </div>
                
                {devices.map((device, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 items-center py-2 text-sm">
                    <div className="col-span-2 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-primary" />
                      <span className="font-medium">{device.name}</span>
                    </div>
                    <div className="text-muted-foreground">{device.model}</div>
                    <div className="text-muted-foreground font-mono text-xs">{device.mac}</div>
                    <div className="text-muted-foreground font-mono text-xs">{device.ip}</div>
                    <AlertBadge variant="success" className="text-xs">
                      {device.status}
                    </AlertBadge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button 
          variant="outline"
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous: {currentStep > 1 ? stepsList[currentStep - 2].title : ''}
        </Button>
        
        <div className="flex gap-3">
          <Button variant="secondary">
            Save as Draft
          </Button>
          <Button 
            onClick={() => goToStep(currentStep + 1)}
            disabled={currentStep === stepsList.length}
          >
            {currentStep < stepsList.length ? 'Next: ' + stepsList[currentStep].title : 'Complete'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}