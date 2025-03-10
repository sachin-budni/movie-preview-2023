import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { VideoComponent } from 'src/app/components/video/video.component';
import { MovieService } from 'src/app/service/movie.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: false
})
export class DetailsComponent implements OnInit {
  $movieDetails: Observable<any> = of();
  $video: Observable<any> = of();
  $credits: Observable<any> = of();
  $cast: Observable<any> = of();
  routeName: any = 'popular';
  type: any = 'person';
  id: any = '';
  paramSubscription: Subscription | undefined;
  router = inject(Router);
  constructor(private route: ActivatedRoute,
    private movie: MovieService,
    private dialog: MatDialog) { }

  ngOnInit(): any {
    this.paramSubscription = this.route.params.subscribe((s: any) => {
      this.id = s.id;
      this.$movieDetails = this.movie.getDetails(this.id, this.type);
      this.$credits = this.movie.getPersonCred(this.id);
      const path = this.router.url;
      const f1 = path.indexOf('/', 1);
      const f2 = path.substring(f1).lastIndexOf('/');
      this.routeName = path.substring(f1 + 1, f2 - 1);
      this.setTitle();
    });
  }

  async setTitle(): Promise<void> {
    this.$movieDetails.subscribe(result => {
      this.movie.setTitle(result.name);
      this.movie.setMetaData(result);
    })
  }

  playTrailer(video: any) {
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
