/**{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Hat app-\u00c3\u00bcbergreifendes Messaging aktiviert",
      "value": "Falsch"
    },
    {
      "label": "Hat app-\u00c3\u00bcbergreifendes Messaging f\u00c3\u00bcr Gruppen aktiviert",
      "value": "Falsch"
    }
  ]
} */
export interface CrossAppMessagingSettingsModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  value: string;
}
