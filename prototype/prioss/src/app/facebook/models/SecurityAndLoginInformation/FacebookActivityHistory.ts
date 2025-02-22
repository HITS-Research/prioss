/**{
  "last_activity_v2": {
    "last_activity_time": {
      "Website": {
        "activity_by_day": [
          1702616206,
          1701579406,
          1701147406,
          1701061006
        ]
      },
      "Facebook-App": {
        "activity_by_day": [
          1702616206,
          1701925006,
          1701406606,
          1701061006
        ]
      },
      "Mobiles Web": {
        "activity_by_day": [
          1701147406
        ]
      },
      "Facebook Lite": {
        "activity_by_day": [
          1702011406,
          170149123456789,
          1701147406
        ]
      }
    }
  }
} */
export interface LastActivityModel {
  last_activity_v2: {
    last_activity_time: {
      [key: string]: {
        activity_by_day: number[];
      };
    };
  };
}
