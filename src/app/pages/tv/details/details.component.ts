import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { VideoComponent } from 'src/app/components/video/video.component';
import { MovieService } from 'src/app/service/movie.service';
import { getRouteName } from 'src/app/utils/utils';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: false
})
export class DetailsComponent implements OnInit {
  $tvDetails: Observable<any> = of();
  $video: Observable<any> = of();
  $similarTV: Observable<any> = of();
  $cast: Observable<any> = of();
  routeName: any = 'popular';
  id: any = '';
  type: any = 'tv';
  router = inject(Router);
  paramSubscription: Subscription | undefined;
  constructor(private route: ActivatedRoute,
              private movie: MovieService,
              private domSanitizer: DomSanitizer,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((s: any) => {
      this.id = s.id;
      this.$tvDetails = this.movie.getDetails(this.id, this.type);
      this.$similarTV = this.movie.similar(this.id, 1, this.type);
      this.routeName = getRouteName(this.router.url);
      this.$cast = this.movie.getMovieCast(this.id);
      this.setTitle();
    });
  }
  async setTitle(): Promise<void> {
    const result = await this.movie.getDetails(this.id, this.type).toPromise();
    this.movie.setTitle(result.original_name);
    this.movie.setMetaData(result);
  }
  nextOrPreviousPage(e: any): void {
    this.$similarTV = this.movie.similar(this.id, e, this.type);
  }
  playTrailer(video: any): void {
    let dialogRef = this.dialog.open(VideoComponent, {
      width: '800px',
      data: {video},
      panelClass: 'video-dailog'
    });
  }
  ngOnDestroy() {
    this.paramSubscription?.unsubscribe();
  }
}
