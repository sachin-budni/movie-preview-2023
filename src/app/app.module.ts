import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeModule } from './features/home/home.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        HomeModule,
        AppRoutingModule,
        BrowserAnimationsModule], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
