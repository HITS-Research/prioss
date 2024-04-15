import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
  input
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ECElementEvent, EChartsOption } from 'echarts';
import { map, switchMap } from 'rxjs';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';
import { SpotifyStreamingHistoryStateModel } from '../../features/streaming-history/streaming-history.statemodel';

/**
 * This component visualizes how many songs from an artist were listened to
 * Because of missing UIDs for artists we cannot distinguish between artists with the same name
 */
@Component({
  selector: 'prioss-spotify-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArtistsComponent {

  previewMode = input(false);

  #store = inject(Store);

  #activeRoute = inject(ActivatedRoute);

  #router = inject(Router);

  /**
   * Parses the the raw data, checks what the earliest and latest date for the "endTime" property of each item.
   * Checks what the initial date range should be for the bar chart and ensures no invalid data is inserted.
   */
  dateRange = toSignal<[Date, Date]>(this.#activeRoute.paramMap.pipe(
    map(items => {
      const s = new Date(items.get('start') ?? 'invalidDate');
      const e = new Date(items.get('end') ?? 'invalidDate');
      return [
        s instanceof Date && !isNaN(s.getTime()) ? s : new Date(2006, 3, 23), // Founding date of Spotify (earliest)
        e instanceof Date && !isNaN(e.getTime()) ? e : new Date(), // Current day (latest)
      ] as [Date, Date];
    }),
    switchMap(selectedRange =>
      this.#store.select(SpotifyStreamingHistoryState.dateRange).pipe(
        map(dataRange => {
          // Check that min and max are set properly
          let min =
            selectedRange[0] < dataRange[0] ? dataRange[0] : selectedRange[0];
          const max =
            selectedRange[1] > dataRange[1] ? dataRange[1] : selectedRange[1];
          min = min > max ? max : min;
          max.setHours(23);
          max.setMinutes(59);
          max.setSeconds(59);
          max.setMilliseconds(997);
          return [min, max] as [Date, Date];
        }),
      ),
    ),
  ), { requireSync: true });


  /**
   * Sets the the current selected Date.
   */
  onDateRangeChanged(dateRange: (Date | null)[]): void {
    if (dateRange.length !== 2) return;

    this.#router.navigate([
      'spot',
      'top-artists',
      dateRange[0]?.toISOString().split('T')[0],
      dateRange[1]?.toISOString().split('T')[0],
    ]);

  }

  /**
   * The current State of the Streaming History.
   */
  #streamingHistory = toSignal(
    this.#store.select(SpotifyStreamingHistoryState.state),
    { requireSync: true }
  );

  /**
   * The signal of a list of all artists, sorted by minutes listened.
   */
  topArtists = computed(() => {
    const state = this.#streamingHistory();
    const isPreview = this.previewMode();

    if (state.length <= 0) return [];

    const [minDate, maxDate] = this.dateRange();
    if (!isPreview && !(minDate instanceof Date && maxDate instanceof Date))
      return [];

    let artistCounter;
    if (isPreview) {
      artistCounter = state;
    } else {
      artistCounter = state
        .filter(item => {
          const endTimeDate = new Date(item.endTime);
          return endTimeDate <= maxDate && endTimeDate >= minDate;
        });
    }

    artistCounter = artistCounter.reduce((
      counterMap: Map<string, number>,
      item: SpotifyStreamingHistoryStateModel,
    ) => {
      const { artistName, msPlayed } = item;
      const minutesPlayed = parseFloat(msPlayed) / 60000;
      const minutesSoFar = (counterMap.get(artistName) ?? 0) + minutesPlayed;
      counterMap.set(artistName, minutesSoFar);
      return counterMap;
    },
      new Map<string, number>(),
    )
      .entries();

    return [...artistCounter]
      .toSorted((a, b) => b[1] - a[1]);
  });

  /**
   * The chart options for e-charts.
   */
  chartOptions: Signal<EChartsOption> = computed(() => {
    const topTen = this.topArtists().slice(0, 10);
    const xAxisData = topTen.map(artist => artist[0]).reverse();
    const seriesData = topTen.map(artist => artist[1]).reverse();

    return {
      yAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: { show: false },
      },
      xAxis: {
        type: 'value',
        name: 'Minutes Played',
        nameLocation: 'middle',
        nameGap: 25,
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          itemStyle: { color: '#1DB954' },
          label: {
            show: true,
            position: 'insideLeft',
            formatter: '{b}',
            color: '#000',
          },
        },
      ],
    } as EChartsOption;
  });

  /**
   * Selects an artist and forwards the user to the "artist-history"-page.
   * @param name The name of the target artist.
   */
  selectArtist(name: string | ECElementEvent): void {
    const parameter = typeof name === 'string' ? name : name.name;
    this.#router.navigate(['spot', 'artist-history', parameter]);
  }
}
