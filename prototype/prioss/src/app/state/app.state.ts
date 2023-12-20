import { State } from "@ngxs/store";
import { AppStateModel, } from "./models";
import { Injectable } from "@angular/core";
import { InstaState } from "../instagram/state/insta.state";
import { FbState } from "../facebook/state/fb.state";
import { SpotifyState } from "../spotify/state/spotify.state";


@State<AppStateModel>({
  name: 'PriOSS',
  defaults: {},
  children: [InstaState, FbState, SpotifyState],
})
@Injectable()
export class AppState { }
