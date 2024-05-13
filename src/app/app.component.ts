import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MovieService } from './service/movie.service';
import { ThemeService } from './theme/theme.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  mobileQuery: MediaQueryList;
  $countries: Observable<any> = of();
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  @ViewChild('scroller', {static: false}) scrolls!: ElementRef;
  activeThem = 'dark';
  regions: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chipGrid') chipGrid!: any;
  regionForm: FormGroup = this.fb.group({});
  filteredFruits: Observable<any[]> = of([]);
  fruitCtrl = new FormControl('');
  selectedRegion: any[] = [];


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
    this.regionForm = this.fb.group({
      region: []
    });

    this.movie.regions
    .subscribe((list: any)=> {
      this.regions = list.results;
    })
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.regions.slice())),
    );
  }

  private _filter(value: string | any): string[] {
    const filterValue = typeof value == "object" ? value.native_name.toLowerCase() : value.toLowerCase();

    return this.regions.filter(region => region.native_name.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedRegion.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

}
