import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddressBookModel, AddressBookItem } from 'src/app/facebook/models/PersonalInformation/OtherPersonalInformation/AddressBooks';
import { SearchHistoryModel, SearchHistoryItem } from 'src/app/facebook/models/LoggedInformation/Search/SearchHistory';
import { FacebookState } from 'src/app/facebook/state/fb.state';
import { FbPersonalInformationDataModel, FbLoggedInformationModel } from '../../state/models';

@Component({
  selector: 'app-other-personal-info',
  templateUrl: './other-personal-info.component.html',
  styleUrls: ['./other-personal-info.component.less'],
})
export class OtherPersonalInfoComponent implements OnInit {
  addressBookData: AddressBookItem[] = [];
  searchHistoryData: SearchHistoryItem[] = [];
  filteredAddressBookData: AddressBookItem[] = [];
  filteredSearchHistoryData: SearchHistoryItem[] = [];
  cellSize: number;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  searchText = '';
  totalContactNumbers = 0;
  contactNumbers: any = [];
  totalSearchedText = 0;
  addressBookPageSize = 10;
  addressBookCurrentPage = 1;
  addressBookTotalPages = 1;
  dataAvailableAddressBook = false;
  dataAvailableSearchHistory = false;

  fbPersonalInfoStore: FbPersonalInformationDataModel = {} as FbPersonalInformationDataModel;
  fbLoggedInfoStore: FbLoggedInformationModel = {} as FbLoggedInformationModel;

  fbAddressBookInfo: AddressBookModel = {} as AddressBookModel;
  fbSearchHistoryInfo: SearchHistoryModel = {} as SearchHistoryModel;

  @Input()
  previewMode = false;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  /**
   * This method is responsible to activate the get the required data for address book and search history.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  async getData() {
    this.fbPersonalInfoStore = this.store.selectSnapshot(
      FacebookState.getFacebookPersonalInformationData,
    );

    this.fbLoggedInfoStore = this.store.selectSnapshot(
      FacebookState.getFacebookLoggedInformationData,
    );

    // Address Book
    this.fbAddressBookInfo = this.fbPersonalInfoStore.address_books;
    this.addressBookData = this.fbAddressBookInfo.address_book_v2.address_book;
    this.dataAvailableAddressBook = this.addressBookData.length !== 0;
    this.gridLayout();
    this.addressBookTotalPages = Math.ceil(this.addressBookData.length / this.addressBookPageSize);
    this.filterAddressBookItems(this.searchText);

    // Search History
    this.fbSearchHistoryInfo = this.fbLoggedInfoStore.search_history;
    this.searchHistoryData = this.fbSearchHistoryInfo.searches_v2;
    this.dataAvailableSearchHistory = this.searchHistoryData.length !== 0;
    this.totalSearchedText = this.searchHistoryData.length;
    this.totalPages = Math.ceil(this.searchHistoryData.length / this.pageSize);
    this.filterSearchHistoryItems(this.searchText);

  }
  /**
   * This method is responsible to show the address data in a grid manner with name and contact number.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  gridLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const padding = 10;
    const numCols = 10;

    const filteredData = this.addressBookData.filter(
      (item) => item.name && item.details && item.details.length > 0,
    );

    if (filteredData.length === 0) {
      this.cellSize = 0;
      return;
    }

    const numRows = Math.ceil(filteredData.length / numCols);

    const maxTextLength = Math.max(
      ...filteredData.map(
        (item) => item.name.length + item.details[0].contact_point.length,
      ),
    );

    this.cellSize = Math.min(
      (width - padding * 2) / numCols,
      (height - padding * 2) / numRows,
      maxTextLength * 10,
    );

    filteredData.forEach((item) => {
      const numbers = item.details.map((detail) => detail.contact_point);
      this.contactNumbers.push(...numbers);
      this.totalContactNumbers += numbers.length;
    });
  }
  /**
   * This method is responsible to filter the searched text in address book tab.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  filterAddressBookItems(searchText: string): void {
    this.addressBookCurrentPage = 1;

    const freshData = this.addressBookData.slice();
    this.filteredAddressBookData = freshData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.details[0].contact_point.toLowerCase().includes(searchText.toLowerCase()),
    );

    this.addressBookTotalPages = Math.ceil(
      this.filteredAddressBookData.length / this.addressBookPageSize,
    );
  }
  /**
   * This method is responsible to filter the searched text in search history tab.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  filterSearchHistoryItems(searchText: string): void {
    this.currentPage = 1;

    const freshData = this.searchHistoryData.slice();
    this.filteredSearchHistoryData = freshData.filter((item) =>
      item.data[0].text.toLowerCase().includes(searchText.toLowerCase()),
    );

    this.totalPages = Math.ceil(
      this.filteredSearchHistoryData.length / this.pageSize,
    );
  }
  /**
   * This method is responsible to show the data in that page for search history(1-10).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  getVisibleData(): SearchHistoryItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSearchHistoryData.slice(startIndex, endIndex);
  }
  /**
   * This method is responsible to show go to the required page of the respective buttons(previos and next).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  /**
   * This method is responsible to show the data in that page for address book(1-10).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  getVisibleAddressBookData(): AddressBookItem[] {
    const startIndex =
      (this.addressBookCurrentPage - 1) * this.addressBookPageSize;
    const endIndex = startIndex + this.addressBookPageSize;
    return this.filteredAddressBookData.slice(startIndex, endIndex);
  }
  /**
   * This method is responsible to show go to the required page of the respective buttons(previos and next).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  goToAddressBookPage(page: number): void {
    if (page >= 1 && page <= this.addressBookTotalPages) {
      this.addressBookCurrentPage = page;
    }
  }
  /**
   * This method is responsible to clear the searched text of search history data.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  clearSearch(): void {
    this.searchText = '';
    this.filterSearchHistoryItems('');
  }
  /**
   * This method is responsible to clear the searched text of address book data.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  clearAddressBookSearch(): void {
    this.searchText = '';
    this.filterAddressBookItems('');
  }
}
