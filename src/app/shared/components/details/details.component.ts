import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of, Subscription, shareReplay } from 'rxjs';
import { MovieService } from 'src/app/core/service/movie.service';
import { getRouteName } from 'src/app/shared/utils/utils';
import { VideoComponent } from '../video/video.component';
import { CommonModule } from '@angular/common';
import { UserMaterialModule } from '../user-material.module';
import { CardMovieTvComponent } from '../card-movie-tv/card-movie-tv.component';

@Component({
  selector: 'app-details',
  imports: [RouterModule, CommonModule, UserMaterialModule, CardMovieTvComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [MovieService]
})
export class DetailsComponent {
  $movieDetails: Observable<any> = of();
    $video: Observable<any> = of();
    $similarMovies: Observable<any> = of();
    $movieReview: Observable<any> = of();
    $translations: Observable<any> = of();
    $cast: Observable<any> = of();
    routeName: any = 'popular';
    @Input() type: string = 'movie'
    @Input() id: number = 0;
    routerSubscription: Subscription | undefined;
    router = inject(Router);
    constructor(private route: ActivatedRoute,
  
      private movie: MovieService,
      private domSanitizer: DomSanitizer,
      private dialog: MatDialog) { }
  
    ngOnInit(): any {
      this.routerSubscription = this.route.params
      .subscribe((s: any) => {
        this.id = s.id;
        this.$movieDetails = this.movie.getDetails(this.id, this.type)
        .pipe(shareReplay());
        this.$similarMovies = this.movie.similar(this.id, 1, this.type);
        this.$movieReview = this.movie.moviesReviews(this.id, 1);
        this.routeName = getRouteName(this.router.url);
        this.$cast = this.movie.getMovieCast(this.id, this.type);
        this.setTitle();
      });
    }
  
    async setTitle(): Promise<void> {
      const result = await this.$movieDetails.toPromise();
      this.movie.setTitle(result.title);
      this.movie.setMetaData(result);
    }
    nextOrPreviousPage(e: any): void {
      this.$similarMovies = this.movie.similar(this.id, e, this.type);
    }
  
    playTrailer(video: any) {
      let dialogRef = this.dialog.open(VideoComponent, {
        width: '800px',
        data: {video},
        panelClass: 'video-dailog'
      });
    }
  
    ngOnDestroy() {
      this.routerSubscription?.unsubscribe();
    }
}
