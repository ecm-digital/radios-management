// Mock data for Network Management System prototype
// This file contains realistic data for demonstrating various UI states

export interface Device {
  id: string;
  name: string;
  model: string;
  macAddress: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  signalStrength: number;
  uptime: string;
  location: string;
  lastSeen: Date;
  firmware: string;
  connectedUsers: number;
  dataTransferred: string;
}

export interface NetworkStats {
  totalDevices: number;
  activeDevices: number;
  offlineDevices: number;
  warningDevices: number;
  errorDevices: number;
  networkUptime: number;
  totalUsers: number;
  peakUsers: number;
  avgSignalStrength: number;
  dataTransferred: string;
  bandwidthUsage: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
}

export interface ActivityEvent {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  deviceId?: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  deviceId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
}

// Mock devices with various states
export const mockDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'Router-Main-01',
    model: 'Ubiquiti UniFi Dream Machine Pro',
    macAddress: '00:1A:2B:3C:4D:5E',
    ipAddress: '192.168.1.1',
    status: 'online',
    signalStrength: -35,
    uptime: '45d 12h 30m',
    location: 'Server Room A',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    firmware: '3.2.7',
    connectedUsers: 45,
    dataTransferred: '2.4 TB'
  },
  {
    id: 'dev-002',
    name: 'AP-Floor1-East',
    model: 'Ubiquiti UniFi 6 Pro',
    macAddress: '00:1A:2B:3C:4D:5F',
    ipAddress: '192.168.1.10',
    status: 'warning',
    signalStrength: -55,
    uptime: '12d 8h 15m',
    location: 'Floor 1 - East Wing',
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    firmware: '3.2.5',
    connectedUsers: 23,
    dataTransferred: '890 GB'
  },
  {
    id: 'dev-003',
    name: 'AP-Floor2-West',
    model: 'Ubiquiti UniFi 6 Lite',
    macAddress: '00:1A:2B:3C:4D:60',
    ipAddress: '192.168.1.11',
    status: 'offline',
    signalStrength: 0,
    uptime: '0d 0h 0m',
    location: 'Floor 2 - West Wing',
    lastSeen: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    firmware: '3.2.7',
    connectedUsers: 0,
    dataTransferred: '1.2 TB'
  },
  {
    id: 'dev-004',
    name: 'Switch-Core-01',
    model: 'Ubiquiti UniFi Switch Pro 24',
    macAddress: '00:1A:2B:3C:4D:61',
    ipAddress: '192.168.1.5',
    status: 'online',
    signalStrength: -40,
    uptime: '89d 4h 22m',
    location: 'Server Room A',
    lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    firmware: '6.5.55',
    connectedUsers: 0,
    dataTransferred: '15.7 TB'
  },
  {
    id: 'dev-005',
    name: 'AP-Outdoor-North',
    model: 'Ubiquiti UniFi 6 Mesh',
    macAddress: '00:1A:2B:3C:4D:62',
    ipAddress: '192.168.1.12',
    status: 'error',
    signalStrength: -75,
    uptime: '2d 14h 8m',
    location: 'North Parking Lot',
    lastSeen: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    firmware: '3.2.4',
    connectedUsers: 8,
    dataTransferred: '234 GB'
  }
];

// Dynamic network stats based on device states
export const getNetworkStats = (): NetworkStats => {
  const onlineDevices = mockDevices.filter(d => d.status === 'online').length;
  const offlineDevices = mockDevices.filter(d => d.status === 'offline').length;
  const warningDevices = mockDevices.filter(d => d.status === 'warning').length;
  const errorDevices = mockDevices.filter(d => d.status === 'error').length;
  
  const totalUsers = mockDevices.reduce((sum, device) => sum + device.connectedUsers, 0);
  const avgSignal = mockDevices
    .filter(d => d.status !== 'offline')
    .reduce((sum, device) => sum + device.signalStrength, 0) / 
    mockDevices.filter(d => d.status !== 'offline').length;

  return {
    totalDevices: mockDevices.length,
    activeDevices: onlineDevices,
    offlineDevices,
    warningDevices,
    errorDevices,
    networkUptime: offlineDevices === 0 ? 99.9 : 97.8,
    totalUsers,
    peakUsers: Math.floor(totalUsers * 1.3),
    avgSignalStrength: Math.round(avgSignal),
    dataTransferred: '18.4 TB',
    bandwidthUsage: 67,
    cpuUsage: 34,
    memoryUsage: 67,
    storageUsage: 23
  };
};

// Recent activity events
export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'evt-001',
    type: 'error',
    title: 'Device Offline',
    description: 'AP-Floor2-West has gone offline and is not responding to ping',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    deviceId: 'dev-003',
    severity: 'high'
  },
  {
    id: 'evt-002',
    type: 'warning',
    title: 'High Memory Usage',
    description: 'Router-Main-01 memory usage has exceeded 85% threshold',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    deviceId: 'dev-001',
    severity: 'medium'
  },
  {
    id: 'evt-003',
    type: 'success',
    title: 'Firmware Update Completed',
    description: 'Successfully updated firmware on Router-Main-01 to version 3.2.7',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    deviceId: 'dev-001',
    severity: 'low'
  },
  {
    id: 'evt-004',
    type: 'info',
    title: 'New User Connected',
    description: '15 new users connected to AP-Floor1-East in the last hour',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    deviceId: 'dev-002',
    severity: 'low'
  },
  {
    id: 'evt-005',
    type: 'warning',
    title: 'Signal Strength Low',
    description: 'AP-Outdoor-North signal strength has dropped to -75 dBm',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    deviceId: 'dev-005',
    severity: 'medium'
  },
  {
    id: 'evt-006',
    type: 'success',
    title: 'Backup Completed',
    description: 'Automated configuration backup completed successfully',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    severity: 'low'
  },
  {
    id: 'evt-007',
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'Network maintenance window scheduled for tonight 2:00-4:00 AM',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    severity: 'low'
  },
  {
    id: 'evt-008',
    type: 'error',
    title: 'Authentication Failed',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    severity: 'high'
  }
];

// System alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'error',
    title: 'Device Offline',
    message: 'AP-Floor2-West has been offline for 45 minutes',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    deviceId: 'dev-003',
    severity: 'high',
    status: 'active'
  },
  {
    id: 'alert-002',
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Router-Main-01 memory usage: 87%',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    deviceId: 'dev-001',
    severity: 'medium',
    status: 'acknowledged',
    assignedTo: 'admin@company.com'
  },
  {
    id: 'alert-003',
    type: 'warning',
    title: 'Signal Strength Low',
    message: 'AP-Outdoor-North signal strength: -75 dBm',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    deviceId: 'dev-005',
    severity: 'medium',
    status: 'active'
  },
  {
    id: 'alert-004',
    type: 'info',
    title: 'Firmware Update Available',
    message: 'New firmware version 3.2.8 available for 3 devices',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    severity: 'low',
    status: 'active'
  },
  {
    id: 'alert-005',
    type: 'error',
    title: 'Security Alert',
    message: 'Multiple failed login attempts from external IP',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    severity: 'critical',
    status: 'active'
  }
];

// Different UI states for demonstration
export const uiStates = {
  loading: {
    stats: false,
    activity: false,
    devices: false
  },
  empty: {
    devices: false,
    activity: false,
    alerts: false
  },
  error: {
    networkError: false,
    deviceError: false,
    authError: false
  }
};

// Utility functions for formatting
export const formatUptime = (uptime: string): string => {
  return uptime;
};

export const formatSignalStrength = (strength: number): string => {
  if (strength === 0) return 'No Signal';
  if (strength > -30) return 'Excellent';
  if (strength > -50) return 'Good';
  if (strength > -60) return 'Fair';
  return 'Poor';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'online': return 'text-[#52c41a]';
    case 'warning': return 'text-[#faad14]';
    case 'error': return 'text-[#f5222d]';
    case 'offline': return 'text-[rgba(0,0,0,0.45)]';
    default: return 'text-[rgba(0,0,0,0.65)]';
  }
};

export const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'online': return 'default';
    case 'warning': return 'secondary';
    case 'error': return 'destructive';
    case 'offline': return 'outline';
    default: return 'outline';
  }
};