/**
{
  "recognized_devices_v2": [
    {
      "name": "Facebook for iPhone",
      "created_timestamp": 1390635712,
      "updated_timestamp": 1447773162,
      "ip_address": "46.223.1.84",
      "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11B554a [FBAN/FBIOS;FBAV/6.8;FBBV/745892;FBDV/iPhone6,2;FBMD/iPhone;FBSN/iPhone OS;FBSV/7.0.4;FBSS/2; FBCR/Vodafone.de;FBID/phone;FBLC/de_DE;FBOP/5]",
      "datr_cookie": "vGrj********************"
    }
  ]
}
*/
export interface RecognizedDevicesModel {
  recognized_devices_v2: RecognizedDeviceItem[];
}
export interface RecognizedDeviceItem {
  name: string;
  created_timestamp: number;
  updated_timestamp?: number;
  ip_address: string;
  user_agent: string;
  datr_cookie: string;
}
