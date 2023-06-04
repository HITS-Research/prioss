import { Component, Input} from '@angular/core';
import cytoscape from 'cytoscape';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { InstaFollowerInfo } from 'src/app/models/Instagram/FollowerInfo/FollowerInfo';
import { InstaFollowerRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-follower.repository';
import { InstaFollowingRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-following.repository';

@Component({
  selector: 'app-insta-followers',
  templateUrl: './insta-followers.component.html',
  styleUrls: ['./insta-followers.component.less'],
  providers: [InstaFollowerRepository, InstaFollowingRepository]
})


export class InstaFollowersComponent {
  previewMode: boolean = false;

  followerInfo : InstaFollowerInfo[] = [];
  followingInfo : InstaFollowerInfo[] = [];
  graphElements: { data: { id?: string, source?: string, target?: string  }, position?: {x: number, y: number} }[] = [];

  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  capitalizeAndPrettify: (str: string) => string = utilities.capitalizeAndPrettify;

  graphOptions = ['Followers', 'Following'];
  selectedTags: string[] = ['Followers', 'Following'];

   // Default page configuration for Follower / Following
   currentFollowerPage = 1;
   currentFollowingPage = 1;
   pageSize = 10;

  constructor(private instaFollowerRepo: InstaFollowerRepository, private instaFollowingRepo: InstaFollowingRepository) {
  }

   /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
    this.followerInfo = await this.instaFollowerRepo.getFollowerInfo();
    await this.instaFollowerRepo.getFollowerInfo().then((followerInfo) => {
      this.followerInfo = followerInfo;
    });
    this.followingInfo = await this.instaFollowingRepo.getFollowingInfo();
    await this.instaFollowingRepo.getFollowingInfo().then((followingInfo) => {
      this.followingInfo = followingInfo;
    });
  }

  /**
   * Prepare the follower/following information for the graph representation. Means changing the format of the representation of this information.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  prepareGraphData(){
    //Creates a set of nodes for the star-pattern
    const nodes = new Set<string>();
    if(this.selectedTags.includes('Followers')){
      this.followerInfo.forEach(follower => nodes.add(follower.instaAccountName)); 
    } 
    if(this.selectedTags.includes('Following')){
      this.followingInfo.forEach(following => nodes.add(following.instaAccountName)); 
    } 
    const numberOfNodes = nodes.size;
    //Gives every node their position in the cycle and add the nodes to the graphElement array
    this.graphElements = [...nodes].map((node, index) => ({
      data: {
        id: node,
      },
      position: { 
        x: 100 + 200 * Math.cos(360/numberOfNodes*index),
        y: 100 + 200 * Math.sin(360/numberOfNodes*index),
      },

    }));

    //adds the users node to the array and fix his position into the center
    const you = 'you';
    this.graphElements.push({
      data:{
        id: you,
      },
      position:{
        x: 100,
        y: 100,
      }
    });
    //Add the edges between the user to its followers
    this.followerInfo.forEach((follower)=>{
      this.graphElements.push({
        data:{
          //id: `${follower.instaAccountName}${you}`,
          source: follower.instaAccountName,
          target: you,
        }
      });
    });
    //Add the edges between the user to its following users
    this.followingInfo.forEach((following)=>{
      this.graphElements.push({
        data:{
          //id: `${following.instaAccountName}${you}`,
          source: you,
          target: following.instaAccountName,
        }
      });
    });
  }

  /**
   * Builds the graph for the followers and following accounts.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async ngAfterViewInit() {
    await this.collectData();
    this.prepareGraphData();
    var cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: this.graphElements,     
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          }
        }
      ],
      layout: {
        //name: 'preset',
        //name: 'random',
        name: 'circle',
        padding: 30,
        fit: true,
      }
    
    });
  }

  //EVENT HANDLER BELOW

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.prepareGraphData();
    console.log('You are interested in: ', this.selectedTags);
  }

   // Pushing only necessary value to table as per page number
  get sliced_follower_data() {
    const start = (this.currentFollowerPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.followerInfo.slice(start, end);
  }

  // Pushing only necessary value to table as per page number
  get sliced_following_data() {
    const start = (this.currentFollowingPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.followingInfo.slice(start, end);
  }

  // Changing the page number based on user selection
  on_follower_page_change(event: any) {
    this.currentFollowerPage = event;
  }

  // Changing the page number based on user selection
  on_following_page_change(event: any) {
    this.currentFollowingPage = event;
  }
}




