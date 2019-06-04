import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MaterialModule } from './material.module';

/**
 * Immport Modules
 */
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';

/** IMPORT COMPONENT  */
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesAddComponent } from './articles/articles-add/articles-add.component';
import { ArticlesEditComponent } from './articles/articles-edit/articles-edit.component';
import { LoginComponent } from './login/login.component';

/**
 * Import Services
 */
import { ArticlesService } from './services/articles.service';
import { AuthGuard } from './_guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { SidenavbarComponent } from './component/sidenavbar/sidenavbar.component';
import { HeaderComponent } from './component/header/header.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ArticlesComponent,
    ArticlesAddComponent,
    ArticlesEditComponent,
    CarouselComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SidenavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    SlimLoadingBarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, ArticlesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
