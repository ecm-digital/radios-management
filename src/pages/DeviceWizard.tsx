import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
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

// Import step components
import DeviceSelectionStep from '@/components/device-wizard-steps/DeviceSelectionStep';
import BasicSetupStep, { DeviceConfig } from '@/components/device-wizard-steps/BasicSetupStep';
import RadioProvisioningStep, { RadioConfig, RadioValidationErrors } from '@/components/device-wizard-steps/RadioProvisioningStep';

// Unified validation error type
interface ValidationErrors {
  basicSetup?: Record<string, { name?: string }>;
  radioProvisioning?: RadioValidationErrors;
}
import ConfirmationStep from '@/components/device-wizard-steps/ConfirmationStep';

type WizardStepStatus = "completed" | "current" | "pending";

const stepsMeta = [
  { id: 1, title: "Device Selection" },
  { id: 2, title: "Basic Setup" },
  { id: 3, title: "Radio Provisioning" },
  { id: 4, title: "Confirmation" }
];

const steps: { id: number; title: string; status: WizardStepStatus }[] = [
  { id: 1, title: "Device Selection", status: "completed" },
  { id: 2, title: "Basic Setup", status: "completed" },
  { id: 3, title: "Radio Provisioning", status: "current" },
  { id: 4, title: "Confirmation", status: "pending" }
];

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



const getInitialState = () => ({
  currentStep: 1,
  highestReachedStep: 1,
  selectedDevices: [],
  basicConfigs: {},
  radioConfig: {
    '2.4ghz': { enabled: true, channel: 'auto', channelWidth: '20', transmitPower: 'auto', operationMode: 'ap', radioProtocol: 'ax', ssids: [{ id: 'ssid-1', enabled: true, name: 'Radiance-Network', security: 'wpa3-personal', password: 'password123', broadcast: true }] },
    '5ghz': { enabled: true, channel: 'auto', channelWidth: '80', transmitPower: 'auto', operationMode: 'ap', radioProtocol: 'ax', ssids: [{ id: 'ssid-2', enabled: true, name: 'Radiance-Network', security: 'wpa3-personal', password: 'password123', broadcast: true }] },
    '6ghz': { enabled: false, channel: 'auto', channelWidth: '160', transmitPower: 'auto', operationMode: 'ap', radioProtocol: 'ax', ssids: [{ id: 'ssid-3', enabled: true, name: 'Radiance-Network', security: 'wpa3-personal', password: 'password123', broadcast: true }] },
  } as RadioConfig
});

export default function DeviceWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(getInitialState().currentStep);
  const [highestReachedStep, setHighestReachedStep] = useState<number>(getInitialState().highestReachedStep);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(getInitialState().selectedDevices);
  const [basicConfigs, setBasicConfigs] = useState<Record<string, DeviceConfig>>(getInitialState().basicConfigs);
  const [radioConfig, setRadioConfig] = useState<RadioConfig>(getInitialState().radioConfig);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSelectDevice = (mac: string) => {
    const newSelectedDevices = selectedDevices.includes(mac)
      ? selectedDevices.filter(m => m !== mac)
      : [...selectedDevices, mac];

    setSelectedDevices(newSelectedDevices);

    // Ensure a default config exists for every selected device
    const newConfigs = { ...basicConfigs };
    newSelectedDevices.forEach(selectedMac => {
      if (!newConfigs[selectedMac]) {
        const device = devices.find(d => d.mac === selectedMac);
        newConfigs[selectedMac] = {
          name: device?.name || '',
          location: '',
          group: '',
        };
      }
    });
    setBasicConfigs(newConfigs);
  };

  const handleBasicConfigChange = (mac: string, field: keyof DeviceConfig, value: string) => {
    setBasicConfigs(prev => ({
      ...prev,
      [mac]: {
        ...prev[mac],
        [field]: value
      }
    }));
  };

  const handleRadioConfigChange = (newConfig: RadioConfig) => {
    setRadioConfig(newConfig);
  };

  const handleApply = () => {
    const finalConfiguration = {
      devices: selectedDevices.map(mac => ({
        mac,
        ...devices.find(d => d.mac === mac),
        config: basicConfigs[mac],
      })),
      radio: radioConfig,
    };

    console.log('Applying final configuration:', JSON.stringify(finalConfiguration, null, 2));
    alert('Configuration applied successfully! Check the console for details.');

    // Reset state
    const initialState = getInitialState();
    setCurrentStep(initialState.currentStep);
    setSelectedDevices(initialState.selectedDevices);
    setBasicConfigs(initialState.basicConfigs);
    setRadioConfig(initialState.radioConfig);
    setHighestReachedStep(initialState.currentStep);
  };

  const validateStep = () => {
    const newErrors: ValidationErrors = {};

    if (currentStep === 2) {
      newErrors.basicSetup = {};
      selectedDevices.forEach(mac => {
        if (!basicConfigs[mac]?.name?.trim()) {
          newErrors.basicSetup[mac] = { name: 'Device name is required.' };
        }
      });
    } else if (currentStep === 3) {
      newErrors.radioProvisioning = {};
      for (const bandKey of Object.keys(radioConfig) as Array<keyof RadioConfig>) {
        const band = radioConfig[bandKey];
        if (band.enabled) {
          band.ssids.forEach(ssid => {
            const ssidErrors: { name?: string; password?: string } = {};
            if (!ssid.name.trim()) {
              ssidErrors.name = 'SSID name is required.';
            }
            if (ssid.security !== 'open' && !ssid.password?.trim()) {
              ssidErrors.password = 'Password is required for WPA2/WPA3.';
            }
            if (Object.keys(ssidErrors).length > 0) {
              if (!newErrors.radioProvisioning[bandKey]) newErrors.radioProvisioning[bandKey] = { ssids: {} };
              if (!newErrors.radioProvisioning[bandKey].ssids) newErrors.radioProvisioning[bandKey].ssids = {};
              newErrors.radioProvisioning[bandKey].ssids[ssid.id] = ssidErrors;
            }
          });
        }
      }
    }
    setValidationErrors(newErrors);
  };

  useEffect(() => {
    validateStep();
  }, [basicConfigs, radioConfig, currentStep]);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedDevices.length > 0;
      case 2:
        return selectedDevices.every(mac => basicConfigs[mac]?.name?.trim());
      case 3:
        const checkSsid = (ssid: any) => ssid.name.trim() && (ssid.security === 'open' || (ssid.password?.length || 0) > 0);
        return Object.values(radioConfig).every(band => 
          !band.enabled || band.ssids.every(checkSsid)
        );
      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (currentStep < stepsMeta.length && isStepValid()) {
      const nextStep = currentStep + 1;
      if (nextStep > highestReachedStep) {
        setHighestReachedStep(nextStep);
      }
      setCurrentStep(nextStep);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= highestReachedStep) {
      setCurrentStep(step);
    }
  };

  return (
    <>
      <Helmet>
        <title>Device Wizard - Radiance Network Management</title>
      </Helmet>
      <div className="p-6 pb-24">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-foreground">Device Wizard</h1>
          <p className="text-muted-foreground">Configure radio parameters for your selected devices</p>
        </div>

        <div className="space-y-6">
          {/* Progress Steps */}
          <WizardSteps 
            steps={stepsMeta.map(step => ({
              ...step,
              status: step.id === currentStep ? 'current' : (step.id < highestReachedStep ? 'completed' : 'pending')
            }))}
            onStepClick={(stepId) => goToStep(stepId)}
          />

          {/* Main Content Card */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Step {currentStep}: {stepsMeta[currentStep - 1].title}
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
            </CardHeader>
            <CardContent>
              {/* Conditionally render the current step component */}
              {currentStep === 1 && (
                <DeviceSelectionStep 
                  devices={devices}
                  selectedDevices={selectedDevices}
                  onSelectDevice={handleSelectDevice}
                />
              )}
              {currentStep === 2 && (
                <BasicSetupStep 
                  selectedDevices={devices.filter(d => selectedDevices.includes(d.mac))}
                  configs={basicConfigs}
                  onConfigChange={handleBasicConfigChange}
                  errors={validationErrors.basicSetup || {}}
                />
              )}
              {currentStep === 3 && (
                <RadioProvisioningStep 
                  config={radioConfig}
                  onConfigChange={handleRadioConfigChange}
                  errors={validationErrors.radioProvisioning || {}}
                  selectedDevices={devices.filter(d => selectedDevices.includes(d.mac))}
                />
              )}
              {currentStep === 4 && (
                <ConfirmationStep 
                  selectedDevices={devices.filter(d => selectedDevices.includes(d.mac))}
                  basicConfigs={basicConfigs}
                  radioConfig={radioConfig}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-background border-t">
          <div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={goToPreviousStep} 
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

          {currentStep < stepsMeta.length ? (
            <Button onClick={goToNextStep} disabled={!isStepValid()}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleApply} disabled={!isStepValid()}>
              <Check className="w-4 h-4 mr-2" />
              Apply Configuration
            </Button>
          )}
          </div>
        </div>
      </div>
    </>
  );
}