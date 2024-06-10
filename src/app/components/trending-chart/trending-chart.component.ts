import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        const { poster_path, profile_path, original_name, original_title, known_for,vote_count, popularity } = val[0].data;
        let voteOrMovie = "";
        if (profile_path) {
          voteOrMovie = `<div style="margin: 2px 0px; display: inline-flex">
                          Movies:<ul style="margin-left: 20px"> ${known_for.map((v: any) =>
                            (`<li>${v.original_title}</li>`))
                            .join("")}</ul>
                        </div>`
        } else {
          voteOrMovie = `<p style="margin: 2px 0px;">Votes: ${vote_count}</p>`
        }
        return `
                <div style="display: flex; ">
                  <img style="${img}" src="https://image.tmdb.org/t/p/w500/${poster_path ?? profile_path}" alt="${original_name ?? original_title}"/>
                  <div style="padding-left: 10px;">
                    <h4 style="margin: 0px 0px 2px;">${original_name ?? original_title}</h4>
                    ${voteOrMovie}
                    <p style="margin: 2px 0px 0px;">Popularity: ${popularity}</p>
                  </div>
                </div>
              `
      })
    },
    grid: {
      left: '5%',
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
          verticalAlign: 'top',
          padding: -20
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

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router
  ) { }
  ngOnInit(): void {
    const url = this.router.url;
    const path = url.substring(url.indexOf('/'), url.indexOf('/', 1));
    const type = path.substring(1);
    if (this.rating.length === 0) {
      this.movieService.getTrendingCharts(type === 'people' ? 'person' : type).subscribe((data: any) => {
        data.results.filter((d: any) => this.rating.push({ value: d.vote_average ?? d.popularity, ...d }));
        data.results.filter((d: any) => this.movieTitles.push(d.title ? d.title : d.name));
        this.all = data.results;
        this.error = '';
        const echart = echarts.init(this.main.nativeElement);
        echart.setOption(this.chartOption);
        echart.on('click', (params: any) => {
          if (params.data.id) {
            this.router.navigate([`${path}/popular`, params.data.id])
          }
        })
      }, (err: any) => this.error = err);
    }
  }
}
