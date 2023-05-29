import { Component, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { GeneralDataComponent } from 'src/app/visualizations/all/general-data/general-data.component';
import { MoodComponent } from 'src/app/visualizations/spotify/mood/mood.component';
import { InferencesComponent } from 'src/app/visualizations/spotify/inferences/inferences.component';
import { IntrojsService } from 'src/app/introjs/introjs.service';
import { ListeningTimeComponent } from 'src/app/visualizations/spotify/listening-time/listening-time.component';
import { BaseDashboard } from '../base-dashboard.abstract';
import { TopArtistsComponent } from 'src/app/visualizations/spotify/top-artists/top-artists.component';
import { TopSongsComponent } from 'src/app/visualizations/spotify/top-songs/top-songs.component';

/**
  * This component is the root component for spotify's dashboard page.
  * This page is shown once a user has successfully uploaded their spotify data-download.
  *
  * @remarks
  * Equivalent components for facebook and instagram exist that define their dashboards
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de), Max (maxy@mail.upb.de))
  *
  */
@Component({
  selector: 'app-spot-dashboard',
  templateUrl: './spot-dashboard.component.html',
  styleUrls: ['./spot-dashboard.component.less']
})
export class SpotDashboardComponent extends BaseDashboard {
  
  thirdPartyConnection = false;
  purposes = [
    {
      active: false,
      name: 'What is the purpose of this website?',
      content: 'This website serves as a Privacy One-stop Shop for users. Our primary objective is to empower users who provide their data by offering them valuable insights and enabling them to make informed decisions. By utilizing our platform, users can gain a better understanding of how their data is collected and take appropriate actions if they are dissatisfied with the current data collection practices. Additionally, we provide comprehensive information about the purposes behind data collection and educate users about their privacy rights. Our goal is to promote transparency and empower individuals to have greater control over their personal information.'
    },
    {
      active: false,
      name: 'What types of user data does this website collect?',
      content: 'Our website operates with full offline functionality, which means that none of the user data available through uploaded data-downloads is sent to any server. All data processing occurs locally on your device, ensuring that your information remains secure and under your control. Furthermore, when you leave the Dashboard, you have the option to delete all locally processed data. Still not fully convinced ? No worries ! Just disconnect your internet before uploading your data and turn it back on after leaving the website. The application works fully offline after loading it once.'
    },
    {
      active: false,
      name: 'Who developed this website?',
      content: 'We are a Team called PriOSS and made up of students from the University of Paderborn. This website is a Student Project developed with a passion for privacy during the Course „Project Group: a Privacy One-Stop Shop“ over the course of one year between October 2022 and September 2023. To get more information about us and the project, visit our About Us page',
    }
  ];

  //Components to Initialize Sequentially
  @ViewChild(ListeningTimeComponent) spotListeningTime : ListeningTimeComponent;
  @ViewChild(GeneralDataComponent) spotGeneralData : GeneralDataComponent;
  @ViewChild(InferencesComponent) spotInferences : InferencesComponent;
  @ViewChild(TopArtistsComponent) spotTopArtists : TopArtistsComponent;
  @ViewChild(TopSongsComponent) spotTopSongs : TopSongsComponent;

  constructor(private dbService: NgxIndexedDBService, private router: Router, private introService: IntrojsService) {
    super();
  }

  /**
   * A Callback called by angular when the views have been initialized
   * 
   * It starts the tour and sets @param tourCompleted in the @service introjs to true.
   * The boolean is set so not every time the page is navigated to, the tour starts again.
   * It also starts the visualization initialization workflow
   *
   * @author: Sven (svenf@mail.upb.de), Simon (scg@mail.upb.de)
   */
  ngAfterViewInit(): void  {
    if (this.introService.isSpotifyTourCompleted() == false) {
      this.introService.spotifyDashboardTour();
      this.introService.setSpotifyTourCompleted(true);
    }

    //Component initialization
    //Add components to component Initialization list from BaseDashboard
    this.componentInitializationList = [];
    this.componentInitializationList.push(this.spotGeneralData);
    this.componentInitializationList.push(this.spotInferences);
    this.componentInitializationList.push(this.spotListeningTime);
    this.componentInitializationList.push(this.spotTopArtists);
    this.componentInitializationList.push(this.spotTopSongs);
    //Start Component Initialization run
    this.startSequentialInitialization();
  }

  /**
   * This method is called on button click and starts the tour.
   */
  startTour() {
    this.introService.spotifyDashboardTour();
  }

}
