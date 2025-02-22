import type { PostModel } from "../Posts/Post";

/**{
    "group_posts_v2": [
      {
        "timestamp": 1386850867,
        "attachments": [
          {
            "data": [
              {
                "media": {
                  "uri": "https://www.facebook.com/redacted",
                  "creation_timestamp": 1386850867,
                  "media_metadata": {
                    "photo_metadata": {
                      "exif_data": [
                        {
                          "upload_ip": "109.42.1.172",
                          "taken_timestamp": 1386850325
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        ],
        "data": [
          
        ],
        "title": "Marcia Husen hat etwas in Mikrosystemtechnik Ersties Uni Berlin WS 11/12 gepostet."
      },
      {
        "timestamp": 139022549123456789,
        "data": [
          {
            "post": "Hallo :) Hat jemand im Reinraum2 das Protokoll zum Lift-Off Modul schreiben m\u00c3\u00bcssen und mag mir das mal schicken, damit ich meine Verbesserung damit abgleichen kann und vor allem den Wert f\u00c3\u00bcr den berechneten Widerstand."
          }
        ],
        "title": "Marcia Husen hat etwas in Mikrosystemtechnik Ersties Uni Berlin WS 11/12 gepostet."
      }
    ]
  }
   */
export interface GroupPostsModel {
  group_posts_v2: PostModel[];
}

