import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-trending-chart',
  templateUrl: './trending-chart.component.html',
  styleUrls: ['./trending-chart.component.scss']
})
export class TrendingChartComponent implements OnInit {
  routeName = 'trendingchart';
  rating: any[] = [];
  movieTitles: any[] = [];
  error: any = 'Loading...';
  @ViewChild('main', { static: true }) main!: ElementRef;

  chartOption: EChartsOption = {
    color: ['#4fffc3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
    series: [
      {
        name: 'Rating',
        type: 'bar',
        barWidth: 20,
        data: this.rating
      }
    ]
  };

  constructor(private movieService: MovieService) { }
  ngOnInit(): void {
    if (this.rating.length === 0) {
      this.movieService.getTrendingCharts().subscribe((data: any) => {
        data.results.filter((d: any) => this.rating.push(d.vote_average));
        data.results.filter((d: any) => this.movieTitles.push(d.title ? d.title : d.name));
        this.error = '';
        const echart = echarts.init(this.main.nativeElement);
        echart.setOption(this.chartOption);
      }, (err: any) => this.error = err);
    }
  }
}
