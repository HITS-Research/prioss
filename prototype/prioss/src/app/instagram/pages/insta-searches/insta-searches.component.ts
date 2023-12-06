import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {InstaUserSearch} from 'src/app/instagram/models/Searches/InstaUserSearch';
import {InstaKeywordSearch} from 'src/app/instagram/models/Searches/InstaKeywordSearch';
import {InstaTagSearch} from 'src/app/instagram/models/Searches/InstaTagSearches';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";


/**
 * This component visualizes the searches of an instergram user.
 * This page is shown once a user visits the likes tab in instagram dashboard
 *
 * @author: Paul (pasch@mail.upb.de)
 *
 */
@Component({
  selector: 'app-insta-searches',
  templateUrl: './insta-searches.component.html',
  styleUrls: ['./insta-searches.component.less']
})
export class InstaSearchesComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

  @Input()
  previewMode = false;
  userSearchValue = '';
  keywordSearchValue = '';
  tagSearchValue = '';
  visible = false;

  sortUserDate = (a: InstaUserSearch, b: InstaUserSearch): number => +a.timestamp - +b.timestamp;
  sortKeywordDate = (a: InstaKeywordSearch, b: InstaKeywordSearch): number => +a.timestamp - +b.timestamp;
  sortTagDate = (a: InstaTagSearch, b: InstaTagSearch): number => +a.timestamp - +b.timestamp;

  userSearches: InstaUserSearch[] = [];
  listOfUserSearches: InstaUserSearch[] = [];
  keywordSearches: InstaKeywordSearch[] = [];
  listOfKeywordSearches: InstaKeywordSearch[] = [];
  tagSearches: InstaTagSearch[] = [];
  listOfTagSearches: InstaTagSearch[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    const {keywordSearch, tagSearch, userSearch} = this.store.selectSnapshot(InstaState.getUserSearchData);
    this.userSearches = userSearch;
    this.listOfUserSearches = [...this.userSearches];
    this.keywordSearches = keywordSearch;
    this.listOfKeywordSearches = [...this.keywordSearches];
    this.tagSearches = tagSearch;
    this.listOfTagSearches = [...this.tagSearches];
  }

  /**
   * A Callback called by angular when the views have been initialized
   * It handles the initialization when the component is displayed on its own dedicated page.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  ngAfterViewInit() {
    if (!this.previewMode) {
      this.initComponent();
    }
  }


  /**
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 6: Searches");
  }

  /**
   * Resets the given searchvalue.
   *
   * @param searchList the list that should be resetted.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  reset(searchList: string): void {
    switch (searchList) {
      case 'user':
        this.userSearchValue = '';
        break;
      case 'keyword':
        this.keywordSearchValue = '';
        break;
      case 'tag':
        this.tagSearchValue = '';
        break;
      default:
        break;
    }

    this.search(searchList);
  }


  /**
   * Searches the given list for the current searchvalue.
   *
   * @param searchList the list that should be searched.
   *
   * @author: Paul (pasch@mail.upb.de)
   */
  search(searchList: string): void {
    this.visible = false;

    switch (searchList) {
      case 'user':
        this.listOfUserSearches = this.userSearches.filter((item: InstaUserSearch) => item.search.toLowerCase().indexOf(this.userSearchValue.toLowerCase()) !== -1);
        break;
      case 'keyword':
        this.listOfKeywordSearches = this.keywordSearches.filter((item: InstaKeywordSearch) => item.search.toLowerCase().indexOf(this.keywordSearchValue.toLowerCase()) !== -1);
        break;
      case 'tag':
        this.listOfTagSearches = this.tagSearches.filter((item: InstaTagSearch) => item.search.toLowerCase().indexOf(this.tagSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }
}
