import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageFilterComponent implements OnInit {
  languageForm: FormGroup = this.fb.group({ language: [] });
  langauges: any[] = [];
  constructor(private router: Router,
              private fb: FormBuilder,
              private movie: MovieService
  ) { }

  ngOnInit(): void {
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

  displayLanguageFn(event: any): any {
    return event ? event.english_name : event;
  }

  onSubmitLanguage(value: any): any {
    if (!value.language) return;
    const lastIndex = window.location.pathname.lastIndexOf('/');
    const current = window.location.pathname.substring(0, lastIndex);
    const realpath = current.split('/').length === 3 ? current : window.location.pathname;
    const pathname = realpath.indexOf('people') === -1 ? realpath : '/movie/popular'
    this.router.navigate([pathname], { queryParams: { page: 1, language: value.language.iso_639_1  } });
  }
}
