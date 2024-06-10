import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { MovieService } from 'src/app/service/movie.service';

const img = `width: 60px;height: 60px;border-radius: 50%;object-fit: cover;`

@Component({
  selector: 'app-trending-chart',
  templateUrl: './trending-chart.component.html',
  styleUrls: ['./trending-chart.component.scss']
})
export class TrendingChartComponent implements OnInit {
  routeName = 'trendingchart';
  rating: any[] = [];
  movieTitles: any[] = [];
  all: any[] = [];
  error: any = 'Loading...';
  @ViewChild('main', { static: true }) main!: ElementRef;

  chartOption: EChartsOption = {
    color: ['#4fffc3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: ((val: any) => {
        console.log(val);
        const { poster_path, title, name, vote_count, popularity } = val[0].data;
        return `
                <div style="display: flex; ">
                  <img style="${img}" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title ?? name}"/>
                  <div style="padding-left: 10px;">
                    <h4 style="margin: 0px 0px 2px;">${title ?? name}</h4>
                    <p style="margin: 2px 0px;">Votes: ${vote_count}</p>
                    <p style="margin: 2px 0px 0px;">Popularity: ${popularity}</p>
                  </div>
                </div>
              `
      })
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.movieTitles,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: '#eabcbc',
          fontSize: 10,
          formatter: ((value: any) => {
            return value.substr(0, 4) + '...';
          })
        }
      }
    ],
    yAxis: [
      {
        name: 'Rating',
        type: 'value',
        nameTextStyle: {
          color: '#eabcbc',
          fontSize: 18,
          verticalAlign: 'top'
        },
        nameLocation: 'middle',
        nameGap: 40,
        axisLabel: {
          color: '#eabcbc',
          fontSize: 18
        }
      }
    ],
    dataset: this.all,
    series: [
      {
        name: 'Ratings',
        type: 'bar',
        barWidth: 20,
        data: this.rating
      }
    ]
  };

  constructor(private movieService: MovieService) { }
  ngOnInit(): void {
    if (this.rating.length === 0) {
      this.movieService.getTrendingCharts('all').subscribe((data: any) => {
        data.results.filter((d: any) => this.rating.push({ value: d.vote_average, ...d }));
        data.results.filter((d: any) => this.movieTitles.push(d.title ? d.title : d.name));
        this.all = data.results;
        this.error = '';
        const echart = echarts.init(this.main.nativeElement);
        echart.setOption(this.chartOption);
      }, (err: any) => this.error = err);
    }
  }
}
