import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieService } from './service/movie.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './material.scss']
})
export class AppComponent {
  activetedRouterName: any;
  URL = 'http://localhost:4000/';
  links = [
    { 
      name: 'Movie',
      link: 'movie',
      links: [
        { path: 'trendingchart', name: 'Trending Charts' },
        { path: 'popular', name: 'Popular' },
        { path: 'latest', name: 'Latest' },
        { path: 'upcoming', name: 'Upcoming' },
        { path: 'top-rated', name: 'Top-Rated' },
        { path: 'now-playing', name: 'Now-Playing' }
      ] 
    },
    {
      name: 'Tv-Shows',
      link: 'tv',
      links: [
        { path: 'popular', name: 'Popular' },
        { path: 'latest', name: 'Latest' },
        { path: 'upcoming', name: 'Upcoming' },
        { path: 'top-rated', name: 'Top-Rated' },
        { path: 'now-playing', name: 'Now-Playing' }    
      ]
    },
    {
      name: 'People',
      link: 'people',
      links: [
        { path: 'popular', name: 'Popular' },
        { path: 'latest', name: 'Latest' }
      ]
    }
  ];
  tvLinks = [
    { path: 'popular', name: 'Popular' },
    { path: 'latest', name: 'Latest' },
    { path: 'upcoming', name: 'Upcoming' },
    { path: 'top-rated', name: 'Top-Rated' },
    { path: 'now-playing', name: 'Now-Playing' },
  ];
  peopleLinks = [
    { path: 'popular', name: 'Popular' },
    { path: 'latest', name: 'Latest' }
  ];
  selectedFood: any;
  searchForm: FormGroup = this.fb.group({});
  languageForm: FormGroup = this.fb.group({});
  mobileQuery: MediaQueryList;
  filteredOptions: Observable<any> = of();
  $countries: Observable<any> = of();
  langauges: any[] = [];
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  // langauges = this.movie.languages;
  @ViewChild('scroller', {static: false}) scrolls!: ElementRef;
  activeThem = 'dark';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private movie: MovieService, private fb: FormBuilder,
              private router: Router, private themeService: ThemeService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              @Inject(PLATFORM_ID) private platformId: string) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    // const svgUrl = 'assets/Icons/loader-default.svg';
    // domain and port for SSR in this example is static. Use i.e. environment files to use appropriate dev/prod domain:port
    const domain = (isPlatformServer(platformId)) ? this.URL : '';

    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.matIconRegistry.addSvgIcon('left_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/left_arrow.svg'));
    this.matIconRegistry.addSvgIcon('right_arrow', this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/right_arrow.svg'));
    this.matIconRegistry.addSvgIcon('menu', this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/menu.svg'));
    this.matIconRegistry.addSvgIcon('no_data', this.domSanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/no_data.svg'));
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      movie: []
    });
    this.languageForm = this.fb.group({
      language: []
    });
    this.searchForm.controls['movie'].valueChanges.subscribe((movie: string) => {
      if (movie && movie.length !== 0) {
        const name = window.location.pathname.split('/')[1];
        const routeName = name === 'people' ? 'person' : name;
        this.filteredOptions = this.movie.searchMovieName(movie, routeName).pipe(
          map((movies: any) => movies.results)
        );
      }
    });
    this.languageForm.controls['language'].valueChanges.subscribe((lang: string) => {
      if (lang && lang.length && lang.length !== 0) {
        this.langauges = this.movie.languages
        .filter((l: any) => l.english_name.toLocaleUpperCase().indexOf(lang.toLocaleUpperCase()) !== -1);
      }
    });
    this.movie.getLanguages
    .pipe(map((lang: any[]) => {
      const lists = lang.map((d: any) => {
        const emp: any = new Object();
        emp.english_name = d.english_name;
        emp.iso_639_1 = d.iso_639_1;
        emp.name = d.name;
        return emp;
      });
      return lists.sort((a: any, b: any) => a.english_name.localeCompare(b.english_name));
    })).subscribe((lang: any[]) => {
      this.movie.languages = lang;
    });
  }

  ActivetedRouter(event: any): void {
    this.searchForm.controls['movie'].setValue('');
    this.activetedRouterName = event;
  }

  onSubmitMovieSearch(movie: any): void {
    const route = this.currentRoute;
    if (movie && typeof movie !== 'string') {
      this.router.navigate(['/'+route+'/popular', movie.movie.id ]);
    }
  }
  get currentRoute() {
    const name = window.location.pathname.split('/')[1];
    return name; 
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  displayLanguageFn(event: any): any {
    return event ? event.english_name : event;
  }

  displayFn(value: any): any {
    const name = value && (value.name) ? value.name : undefined;
    const title = value && (value.title) ? value.title : value;
    const originalTitle = value && value.original_title ? value.original_title : value;
    if (originalTitle) {
      return name || (originalTitle + ' | ' + title);
    }
    return name || title;
  }

  onSubmitLanguage(value: any): any {
    if (!value.language) return;
    const lastIndex = window.location.pathname.lastIndexOf('/');
    const current = window.location.pathname.substring(0, lastIndex);
    const realpath = current.split('/').length === 3 ? current : window.location.pathname;
    const pathname = realpath.indexOf('people') === -1 ? realpath : '/movie/popular'
    this.router.navigate([pathname], { queryParams: { page: 1, language: value.language.iso_639_1  } });
  }

  getLang(lng: any): any {
    return this.movie.languages.filter((l: any) => l.iso_639_1 === lng).map((l: any) => l.english_name);
  }

  changeToggle(event: MatSlideToggleChange): any {
    if (event.checked) {
      this.themeService.setActiveThem('light');
      this.activeThem = 'light';
    } else {
      this.themeService.setActiveThem('dark');
      this.activeThem = 'dark';
    }
  }
}
