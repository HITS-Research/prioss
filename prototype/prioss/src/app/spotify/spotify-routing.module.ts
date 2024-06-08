import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InferencesComponent } from './pages/inferences/inferences.component';
import { ListeningTimeComponent } from './pages/listening-time/listening-time.component';
import { MoodComponent } from './pages/mood/mood.component';
import { SpotPrivacyInstructionsComponent } from './pages/privacy-instructions/spot-privacy-instructions.component';
import { SongtimelineComponent } from './pages/songtimeline/songtimeline.component';
import { SpotifyTopSongArtistsComponent } from './pages/spotif-top-song-artists/spotify-top-song-artists.component';
import { SpotifyArtistHistoryComponent } from './pages/spotify-artist-history/spotify-artist-history.component';
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component';
import { SpotifySearchHistoryComponent } from './pages/spotify-search-history/spotify-search-history.component';
import { SpotifySongHistoryComponent } from './pages/spotify-song-history/spotify-song-history.component';
import { SpotifyTopPodcastsComponent } from './pages/spotify-top-podcasts/spotify-top-podcasts.component';
import { SpotifyUserDataComponent } from './pages/spotify-user-data/spotify-user-data.component';
import { TopSongsComponent } from './pages/top-songs/top-songs.component';
import { spotifyGuard } from '../guards/spotify.guard';
import { SpotifyTopPodcastsDetailsComponent } from './pages/spotify-top-podcasts-details/spotify-top-podcasts-details.component';

const routes: Routes = [
  {
    path: 'spot',
    canActivateChild: [spotifyGuard],
    children: [
      { path: 'dashboard', component: SpotifyDashboardComponent },
      { path: 'general-data', component: SpotifyUserDataComponent },
      { path: 'inference', component: InferencesComponent },
      { path: 'listening-time', component: ListeningTimeComponent },
      { path: 'listening-time/:start/:end', component: ListeningTimeComponent },
      { path: 'listening-time/songtimeline', component: SongtimelineComponent },
      { path: 'mood', component: MoodComponent },
      {
        path: 'privacy-instructions',
        component: SpotPrivacyInstructionsComponent,
      },
      {
        path: 'artist-history/:artistName',
        component: SpotifyArtistHistoryComponent,
      },
      { path: 'search-history', component: SpotifySearchHistoryComponent },
      { path: 'top-song-artists', component: SpotifyTopSongArtistsComponent },
      {
        path: 'top-song-artists/:start/:end',
        component: SpotifyTopSongArtistsComponent,
      },
      {
        path: 'podcast/:name',
        component: SpotifyTopPodcastsDetailsComponent,
      },
      { path: 'top-podcasts', component: SpotifyTopPodcastsComponent },
      {
        path: 'top-podcasts/:start/:end',
        component: SpotifyTopPodcastsComponent,
      },
      { path: 'top-songs', component: TopSongsComponent },
      { path: 'top-songs/:start/:end', component: TopSongsComponent },
      {
        path: 'song-history/:artist/:song',
        component: SpotifySongHistoryComponent,
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpotifyRoutingModule {}
