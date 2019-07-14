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
import { AngularFontAwesomeModule } from 'angular-font-awesome';

/**
 * Immport Modules
 */
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';

/** IMPORT Admin COMPONENT  */
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesAddComponent } from './articles/articles-add/articles-add.component';
import { ArticlesEditComponent } from './articles/articles-edit/articles-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavbarComponent } from './component/sidenavbar/sidenavbar.component';
import { HeaderComponent } from './component/header/header.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './admin/admin.component';

import { CategoryComponent } from './pages/category/category.component';
import { ArticleViewComponent } from './pages/article-view/article-view.component';
import { SoGiftComponent } from './pages/so-gift/so-gift.component';
import { WhoAreUsComponent } from './pages/who-are-us/who-are-us.component';
import { PubComponent } from './pages/pub/pub.component';
import { ContactComponent } from './pages/contact/contact.component';


import { BanniereComponent } from './component/banniere/banniere.component';

/**
 * Import Services
 */
import { CategoriesService } from './services/categories.service';
import { ArticlesService } from './services/articles.service';
import { AuthGuard } from './_guard/auth.guard';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ArticlesComponent,
    ArticlesAddComponent,
    ArticlesEditComponent,
    ArticleViewComponent,
    BanniereComponent,
    CategoryComponent,
    CarouselComponent,
    ContactComponent,
    CategoriesAddComponent,
    CategoriesComponent,
    CategoriesEditComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    PubComponent,
    SoGiftComponent,
    SidenavbarComponent,
    WhoAreUsComponent
  ],
  imports: [
    AngularFontAwesomeModule,
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
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, ArticlesService, CategoriesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
