import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceDashboardComponent } from './dashboards/face-dashboard/face-dashboard.component';
import { InstaDashboardComponent } from './dashboards/insta-dashboard/insta-dashboard.component';
import {Insta_PersonalInfoComponent} from './visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from './visualizations/instagram/insta-ads/insta-ads.component';
import { InstaLikedContentComponent } from './visualizations/instagram/insta-liked-content/insta-liked-content.component';

import { SpotDashboardComponent } from './dashboards/spot-dashboard/spot-dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceSelectionComponent } from './service-selection/service-selection.component';
import { GeneralDataComponent } from './visualizations/all/general-data/general-data.component';
import { ListeningTimeComponent } from './visualizations/spotify/listening-time/listening-time.component';
import { InferencesComponent } from './visualizations/spotify/inferences/inferences.component';
import { MoodComponent } from './visualizations/spotify/mood/mood.component';
import {TopArtistsComponent} from "./visualizations/spotify/top-artists/top-artists.component";
import {TopSongsComponent} from "./visualizations/spotify/top-songs/top-songs.component";
import { AboutComponent } from './info-pages/about/about.component';
import { ContactComponent } from './info-pages/contact/contact.component';
import { InferredTopicsComponent } from './visualizations/facebook/inferred-topics/inferred-topics.component';
import { AdsRelatedDataComponent } from './visualizations/facebook/ads-related-data/ads-related-data.component';
import { FriendAndFollowersComponent } from './visualizations/facebook/friend-and-followers/friend-and-followers.component';
import { OffFacebookActivityComponent } from './rectification/facebook/off-facebook-activity/off-facebook-activity.component';
import { InstaSearchesComponent } from './visualizations/instagram/insta-searches/insta-searches.component';
import { InstaFollowersComponent } from './visualizations/instagram/insta-followers/insta-followers.component';
import { InstaContactComponent } from './visualizations/instagram/insta-contact/insta-contact.component';
import { InstaShoppingComponent } from './visualizations/instagram/insta-shopping/insta-shopping.component';
import { KnownIssuesComponent } from './info-pages/known-issues/known-issues.component';
import { AdsSettingsComponent } from './manage-privacy/facebook/guidlines-for-ads-settings/ads-settings/ads-settings.component';
import { SpotPrivacyInstructionsComponent } from "./visualizations/spotify/privacy-instructions/spot-privacy-instructions.component";
import { OtherPersonalInfoComponent } from './visualizations/facebook/other-personal-info/other-personal-info.component';
import { SongtimelineComponent } from './visualizations/spotify/songtimeline/songtimeline.component';
import { PostsComponent } from './visualizations/facebook/face-posts/posts/posts.component';
import { InstaBlockFollowersComponent } from './rectification/instagram/insta-block-followers/insta-block-followers.component';
import { InstaAccountPrivateComponent } from './rectification/instagram/insta-account-private/insta-account-private.component';
import { InstaTwoFactorAuthenticationComponent } from './rectification/instagram/insta-two-factor-authentication/insta-two-factor-authentication.component';
import { InstaHideStoriesComponent } from './rectification/instagram/insta-hide-stories/insta-hide-stories.component';
import { InstaProfileInfoPrivateComponent } from './rectification/instagram/insta-profile-info-private/insta-profile-info-private.component';
import { InstaAddManagerComponent } from './rectification/instagram/insta-add-manager/insta-add-manager.component';
import { RevokeAccessComponent } from './rectification/instagram/revoke-access/revoke-access.component';
import { GroupsAndEventsDataComponent } from './visualizations/facebook/groups-and-events-data/groups-and-events-data.component';
import { YourTopicsComponent } from './manage-privacy/facebook/your-topics/your-topics.component';
import { SecurityLoginDataComponent } from './visualizations/facebook/security-login-data/security-login-data.component';
import { MessagesComponent } from './visualizations/facebook/messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'known-issues', component: KnownIssuesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
 // { path: 'faq', component: FaqComponent },
  { path: 'spot/inference', component: InferencesComponent },
  { path: 'spot/mood', component: MoodComponent },
  { path: 'spot/listening-time', component: ListeningTimeComponent },
  { path: 'spot/listening-time/songtimeline', component: SongtimelineComponent },
  { path: 'spot/general-data', component: GeneralDataComponent },
  { path: 'spot/dashboard', component: SpotDashboardComponent },
  { path: 'spot/top-artists', component: TopArtistsComponent },
  { path: 'spot/top-artists/:start/:end', component: TopArtistsComponent },
  { path: 'spot/privacy-instructions', component: SpotPrivacyInstructionsComponent },
  { path: 'spot/top-songs', component: TopSongsComponent },
  { path: 'spot/top-songs/:start/:end', component: TopSongsComponent },
  { path: 'insta/dashboard', component: InstaDashboardComponent },
  { path: 'insta/personal-info', component:Insta_PersonalInfoComponent },
  { path: 'insta/account', component:InstaAccountCreationLoginComponent },
  { path: 'insta/ads', component: InstaAdsComponent },
  { path: 'insta/followers', component: InstaFollowersComponent},
  { path: 'insta/likedcontent', component: InstaLikedContentComponent },
  { path: 'insta/contacts', component: InstaContactComponent },
  { path: 'face/dashboard', component: FaceDashboardComponent },
  { path: 'face/inferred-topics', component: InferredTopicsComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  { path: 'face/ads-related-data', component: AdsRelatedDataComponent },
  { path: 'face/connections', component: FriendAndFollowersComponent },
  { path: 'face/configure-off-facebook-activity', component: OffFacebookActivityComponent },
  { path: 'face/guidelines-for-ads-settings', component: AdsSettingsComponent },
  { path: 'insta/block-followers', component: InstaBlockFollowersComponent },
  { path: 'insta/account-private' , component: InstaAccountPrivateComponent},
  { path: 'insta/two-factor-authentication' , component: InstaTwoFactorAuthenticationComponent},
  { path: 'insta/hide-stories' , component:InstaHideStoriesComponent},
  { path: 'insta/profile-info-private' , component:InstaProfileInfoPrivateComponent},
  { path: 'insta/add-manager' , component:InstaAddManagerComponent},
  { path: 'insta/revoke-access' , component: RevokeAccessComponent},
  { path: 'insta/searches', component: InstaSearchesComponent},
  { path: 'insta/shopping', component: InstaShoppingComponent},
  { path: 'face/other-personal-info' ,component:OtherPersonalInfoComponent},
  { path: 'face/groups-and-events-data' , component: GroupsAndEventsDataComponent},
  { path: 'face/your-topics', component: YourTopicsComponent},
  { path: 'face/security-login', component: SecurityLoginDataComponent },
  { path: 'insta/searches', component: InstaSearchesComponent},
  { path: 'face/other-personal-info' ,component: OtherPersonalInfoComponent},
  { path: 'face/posts' ,component: PostsComponent},
  { path: 'face/messages-info' ,component:MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
