import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { TYPES_OF_MOVIE } from '../../models/movie-models';
import { TYPES_OF_TV } from '../../models/tv-models';
import { Response_Data, TYPES_OF_ROUTES, UrlQueryParam } from '../../models/common-models';

@Injectable()
export class MovieService {
  languages: any[] = [];
  private http = inject(HttpClient);
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaData(result: { title: string, name: string, overview: string, biography: string, poster_path: string, profile_path: string }) {
    this.meta.updateTag({property: 'og:title', content: (result.title || result.name)}, 'url')
    this.meta.updateTag({property: 'og:description', content: (result.overview || result.biography)}, 'url')
    this.meta.updateTag(
      {
        property: 'og:image',
        content: 'https://image.tmdb.org/t/p/w500'+(result.poster_path || result.profile_path)
      },
      'url'
    )
  }

  get getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`/configuration/languages?api_key=`);
  }

  get getCountries(): any {
    return this.http.get(`/configuration/countries?api_key=`);
  }

  getMovieVideos(id: number): any {
    return this.http.get(`/movie/${id}/videos?api_key=`);
  }

  getList(type: TYPES_OF_ROUTES, routerName: TYPES_OF_MOVIE | TYPES_OF_TV, params: any): Observable<Response_Data> {
    let api = '';
    if (params.with_original_language) {
      api = `/${type}/${routerName}?api_key=&language=en-IN&page=${params.page}&with_original_language=${params.with_original_language}`;
    } else {
      api = `/${type}/${routerName}?api_key=&language=en-IN&page=${params.page}`;
    }
    return this.http.get<Response_Data>(api);
  }

  getDiscover(type: TYPES_OF_ROUTES, routerName: TYPES_OF_MOVIE | TYPES_OF_TV, params: any): Observable<Response_Data> {
    let api = '';
    if (params.with_original_language) {
      api = `/${routerName}/${type}?api_key=&language=en-IN&page=${params.page}&with_original_language=${params.with_original_language}`;
    } else {
      api = `/${routerName}/${type}?api_key=&language=en-IN&page=${params.page}`;
    }
    return this.http.get<Response_Data>(api);
  }

  getTrendingCharts(type: string): any {
    return this.http.get(`/trending/${type}/day?api_key=`);
  }

  getDetails(id: number, type: string): Observable<any> {
    return this.http.get(`/${type}/${id}?api_key=&language=en-US&append_to_response=videos`);
  }

  getPersonCred(id: number): any {
    return this.http.get(`/person/${id}/combined_credits?api_key=&language=en-US`);
  }

  getMovieCast(id: number, type: string): any {
    return this.http.get(`/${type}/${id}/credits?api_key=`);
  }

  getLatest(type: string): any {
    return this.http.get(`/${type}/latest?api_key=&language=en-US`);
  }

  searchMovieName(movie: string, type: string): Observable<any> {
    return this.http.get<any>(`/search/${type}?api_key=&language=en-US&query=${movie}&page=1&include_adult=false`);
  }

  convertLanguageObj(obj: UrlQueryParam): UrlQueryParam {
    const paramObj: UrlQueryParam = {};
    if (obj.language) {
      paramObj.with_original_language = obj.language;
      paramObj.page = obj.page;
    } else {
      paramObj.page = obj.page;
    }
    return paramObj;
  }

  get genres(): Observable<any> {
    return this.http.get('/movie/{585244}/similar');
  }

  similar(id: number, page: number, type: string): Observable<any> {
    return this.http.get<any>(`/${type}/${id}/similar?page=${page}&api_key=&language=en-US`);
  }
  moviesReviews(id: number, page: number): Observable<any> {
    return this.http.get<any>(`/movie/${id}/reviews?api_key=&page=${page}&language=en-US`);
  }

  setTitle(name: string): void {
    this.title.setTitle(name);
  }
  get regions(): Observable<any> {
    return this.http.get("/watch/providers/regions?language=en-US&api_key=")
  }

  translations(movieId: number): Observable<any> {
    return this.http.get(`/movie/${movieId}/translations?api_key=`);
  }
}
