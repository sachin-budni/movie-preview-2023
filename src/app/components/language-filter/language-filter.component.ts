import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { UserMaterialModule } from '../user-material.module';
import { CommonModule } from '@angular/common';
import { getRoute } from 'src/app/utils/utils';

@Component({
    selector: 'app-language-filter',
    templateUrl: './language-filter.component.html',
    styleUrls: ['./language-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ReactiveFormsModule, UserMaterialModule, CommonModule]
})
export class LanguageFilterComponent implements OnInit {
  languageForm: FormGroup = this.fb.group({ language: [] });
  langauges: any[] = [];
  getLanguagesSubscription: Subscription | undefined;
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
    this.getLanguagesSubscription = this.movie.getLanguages
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
    this.router.navigate([`/movie/discover`], { queryParams: { page: 1, language: value.language.iso_639_1  } });
  }

  ngOnDestroy() {
    this.getLanguagesSubscription?.unsubscribe();
  }
}
