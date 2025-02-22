/**{
  "secret_conversations_v2": {
    "tincan_devices": [
      
    ],
    "armadillo_devices": [
      {
        "device_type": "MsgrBlue:Web-301.0.2,Debug",
        "device_manufacturer": "Windows",
        "device_model": "Firefox",
        "device_os_version": "10",
        "last_connected_ip": "2a02:908:2224::",
        "last_active_time": 1701680016
      },
      {
        "device_type": "MsgrBlue:Web-301.0.2,Debug",
        "device_manufacturer": "Linux",
        "device_model": "Chrome",
        "device_os_version": "",
        "last_connected_ip": "2003:e0:571c::",
        "last_active_time": 1702745666
      }
    ],
    "calls": [
      
    ]
  }
} */
export interface SecretConversationModel {
  secret_conversations_v2: SecretConversation;
}
export interface SecretConversation {
  tincan_devices: TincanDevice[];
  armadillo_devices: ArmadilloDevice[];
  calls: Call[];
}
export interface TincanDevice {
  device_type: string;
  device_manufacturer: string;
  device_model: string;
  device_os_version: string;
  last_connected_ip: string;
  last_active_time: number;
}
export interface ArmadilloDevice {
  device_type: string;
  device_manufacturer: string;
  device_model: string;
  device_os_version: string;
  last_connected_ip: string;
  last_active_time: number;
}
export interface Call {}
