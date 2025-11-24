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
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import "../styles/alert-colors.css"
import "../styles/wizard-steps.css"
import "../styles/ant-forms.css"
import { 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Download,
  Plus,
  Radio,
  Check,
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
  Zap
} from "lucide-react"
import { WizardSteps } from "@/components/ui/wizard-steps"
import { DeviceTableSkeleton } from "@/components/ui/skeleton"

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
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(getInitialState().currentStep);
  const [highestReachedStep, setHighestReachedStep] = useState<number>(getInitialState().highestReachedStep);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(getInitialState().selectedDevices);
  const [basicConfigs, setBasicConfigs] = useState<Record<string, DeviceConfig>>(getInitialState().basicConfigs);
  const [radioConfig, setRadioConfig] = useState<RadioConfig>(getInitialState().radioConfig);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isApplying, setIsApplying] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSelectDevice = (mac: string) => {
    const newSelectedDevices = selectedDevices.includes(mac)
      ? selectedDevices.filter(m => m !== mac)
      : [...selectedDevices, mac];

    setSelectedDevices(newSelectedDevices);
    setHasUnsavedChanges(true);

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
    setHasUnsavedChanges(true);
  };

  const handleRadioConfigChange = (newConfig: RadioConfig) => {
    setRadioConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const handleApply = async () => {
    setIsApplying(true);
    
    try {
      const finalConfiguration = {
        devices: selectedDevices.map(mac => ({
          mac,
          ...devices.find(d => d.mac === mac),
          config: basicConfigs[mac],
        })),
        radio: radioConfig,
        timestamp: new Date().toISOString(),
        appliedBy: 'admin' // In real app, get from auth context
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Applying final configuration:', JSON.stringify(finalConfiguration, null, 2));
      
      toast({
        title: "Configuration Applied Successfully",
        description: `Applied configuration to ${selectedDevices.length} device(s)`,
        variant: "default",
      });

      // Reset state
      const initialState = getInitialState();
      setCurrentStep(initialState.currentStep);
      setSelectedDevices(initialState.selectedDevices);
      setBasicConfigs(initialState.basicConfigs);
      setRadioConfig(initialState.radioConfig);
      setHighestReachedStep(initialState.currentStep);
      setHasUnsavedChanges(false);
      
    } catch (error) {
      toast({
        title: "Configuration Failed",
        description: "Failed to apply configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveTemplate = () => {
    const template = {
      name: `Template_${new Date().toISOString().split('T')[0]}`,
      radioConfig,
      basicConfigTemplate: Object.values(basicConfigs)[0] || {},
      createdAt: new Date().toISOString()
    };
    
    // In real app, save to backend
    localStorage.setItem('wizard_template', JSON.stringify(template));
    
    toast({
      title: "Template Saved",
      description: "Configuration template saved successfully",
      variant: "default",
    });
  };

  const handleLoadTemplate = () => {
    try {
      const template = localStorage.getItem('wizard_template');
      if (template) {
        const parsed = JSON.parse(template);
        setRadioConfig(parsed.radioConfig);
        
        toast({
          title: "Template Loaded",
          description: "Configuration template loaded successfully",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Load Failed",
        description: "Failed to load template",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    const initialState = getInitialState();
    setCurrentStep(initialState.currentStep);
    setSelectedDevices(initialState.selectedDevices);
    setBasicConfigs(initialState.basicConfigs);
    setRadioConfig(initialState.radioConfig);
    setHighestReachedStep(initialState.currentStep);
    setHasUnsavedChanges(false);
    
    toast({
      title: "Wizard Reset",
      description: "All configurations have been reset",
      variant: "default",
    });
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
      
      // Show progress toast
      toast({
        title: `Step ${nextStep} of ${stepsMeta.length}`,
        description: stepsMeta[nextStep - 1].title,
        variant: "default",
      });
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
        {/* Enhanced Header */}
        <div className="border-b pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground animate-in fade-in-0 duration-700">
                Device Configuration Wizard
              </h1>
              <p className="text-muted-foreground animate-in fade-in-0 duration-700 delay-100">
                Configure radio parameters and settings for your selected devices
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 animate-in fade-in-0 duration-700 delay-200">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{selectedDevices.length} device(s) selected</span>
                </div>
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Unsaved changes</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleLoadTemplate}>
                      <Copy className="w-4 h-4 mr-2" />
                      Load Template
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Load saved configuration template</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Template
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save current configuration as template</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset wizard to initial state</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {Math.round((currentStep / stepsMeta.length) * 100)}% Complete
              </span>
            </div>
            <Progress 
              value={(currentStep / stepsMeta.length) * 100} 
              className="h-2 animate-in fade-in-0 duration-500"
            />
          </div>

          {/* Progress Steps */}
          <WizardSteps 
            steps={stepsMeta.map(step => ({
              ...step,
              status: step.id === currentStep ? 'current' : (step.id <= highestReachedStep ? 'completed' : 'pending')
            }))}
            onStepClick={(stepId) => goToStep(stepId)}
          />

          {/* Main Content Card */}
          <Card className="animate-in fade-in-0 duration-500 delay-200 glass-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{currentStep}</span>
                    </div>
                    {stepsMeta[currentStep - 1].title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {currentStep === 1 && "Select the devices you want to configure"}
                    {currentStep === 2 && "Configure basic settings for each device"}
                    {currentStep === 3 && "Set up radio parameters and wireless networks"}
                    {currentStep === 4 && "Review and apply your configuration"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {currentStep === 3 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Export radio configuration</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {!isStepValid() && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm">Complete required fields</span>
                    </div>
                  )}
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

        {/* Enhanced Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-xl border-t border-white/20 shadow-lg z-50">
          <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Exit Wizard
              </Button>
              
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>You have unsaved changes</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Step indicator */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Step {currentStep} of {stepsMeta.length}</span>
                <div className="w-px h-4 bg-border" />
                <span>{selectedDevices.length} device(s) selected</span>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep} 
                  disabled={currentStep === 1}
                  className="transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < stepsMeta.length ? (
                  <Button 
                    onClick={goToNextStep} 
                    disabled={!isStepValid()}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleApply} 
                    disabled={!isStepValid() || isApplying}
                    className="transition-all duration-200 hover:scale-105 bg-green-600 hover:bg-green-700"
                  >
                    {isApplying ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Apply Configuration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}