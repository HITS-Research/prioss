import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { SQLiteService } from './services/sqlite/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'prioss';
  pRouter: Router;
  isCollapsed: boolean = false;
  serviceName: string;
  isDashboard: boolean = false;
  navigateAndScroll: (router: Router, url: string) => void = utilities.navigateAndScroll;

  public isWeb: boolean = false;
  private initPlugin: boolean;

  constructor(private router: Router, private sqlite: SQLiteService) {
    this.pRouter = router;

    this.sqlite.initializePlugin().then(async (ret) => {
      this.initPlugin = ret;

      if( this.sqlite.platform === "web") {
        this.isWeb = true;
        await customElements.whenDefined('jeep-sqlite');
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if(jeepSqliteEl != null) {
          await this.sqlite.initWebStore();
          console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
        } else {
          console.log('>>>> jeepSqliteEl is null');
        }
      }

      console.log('>>>> in App  this.initPlugin ' + this.initPlugin);
    });
  }

  /**
  * This method sets the service name property depending on the current dashboard.
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
  setServiceName(): void {
    console.log(this.router.url)
    switch ( this.router.url ) {
      case '/face/dashboard':
        this.serviceName = 'face';
        this.isDashboard = true;
        break;
      case '/insta/dashboard':
        this.serviceName = 'insta';
        this.isDashboard = true;
        break;
      case '/spot/dashboard':
        this.serviceName = 'spot';
        this.isDashboard = true;
        break;
    }
  }
}
