import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
/**
 * Immport Modules
 */
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';

/** IMPORT COMPONENT  */
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';

/**
 * Import Services
 */
import { ArticlesService } from './services/articles.service';
import { AuthGuard } from './_guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlimLoadingBarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, ArticlesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
