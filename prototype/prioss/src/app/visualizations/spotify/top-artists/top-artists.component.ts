import {Component, Input} from '@angular/core';
import * as d3 from 'd3';
import {SpotHistoryRepository} from "../../../db/data-repositories/spotify/spot-history/spot-history.repository";

/**
 * This component visualizes how many songs from an artist were listened to
 * Because of missing UIDs for artists we cannot distinguish between artists with the same name
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'spot-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.less']
})


export class TopArtistsComponent {

  readonly spotifyGreen: string = "#1DB954";
  @Input()
  previewMode: boolean = false;

  filterFromDate: Date | null;
  filterToDate: Date | null;

  minListenedToArtist : any[];
  activeTabIndex: number;

  constructor(private spotHistoryRepo: SpotHistoryRepository) {
    this.initializeVisualisation()
  }

  async initializeVisualisation() {
    this.filterFromDate = await this.spotHistoryRepo.getFirstDay();
    this.filterToDate = await this.spotHistoryRepo.getMostRecentDay();

    this.spotHistoryRepo.getMinListenedToArtists(this.filterFromDate, this.filterToDate).then((result) => {
      this.minListenedToArtist = result;
      this.makeBarChart(result.slice(0, 10));
    });
  }

  onDateFilterChanged() {
    if (this.filterFromDate !== null && this.filterToDate !== null) {
      this.spotHistoryRepo.getMinListenedToArtists(this.filterFromDate, this.filterToDate).then((result) => {
        this.minListenedToArtist = result;
        if (this.activeTabIndex == 0) {
          this.makeBarChart(result.slice(0, 10));
        }
      });
    }
  }

  onTabSwitch(index: number) {
    this.activeTabIndex = index;
    if (index == 0) {
      this.makeBarChart(this.minListenedToArtist.slice(0, 10));
    }
  }


  /**
   * Creates the bar chart showing the number of songs listened by an artist
   *
   * @param data: A map containing the name of an artist as key and the number of songs heard by the artist as value
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  makeBarChart(data: { artistName: string, minPlayed: number }[]) {
    //remove old barchart
    d3.select(".bar_chart_top_artists").selectAll("*").remove();

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(".bar_chart_top_artists")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const xScale = d3.scaleLinear()
      .domain([0, data[0].minPlayed]) // maximum
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var yScale: any = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.artistName))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0));

    //Bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.artistName))
      .attr("width", d => xScale(d.minPlayed))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.spotifyGreen);

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Minutes listened");
  }

}
