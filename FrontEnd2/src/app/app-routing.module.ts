import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesAddComponent } from './articles/articles-add/articles-add.component';
import { ArticleViewComponent } from './pages/article-view/article-view.component';

import { ArticlesEditComponent } from './articles/articles-edit/articles-edit.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_guard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PubComponent } from './pages/pub/pub.component';
import { WhoAreUsComponent } from './pages/who-are-us/who-are-us.component';
import { SoGiftComponent } from './pages/so-gift/so-gift.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: 'article/:id',
  //   component: ArticlesViewComponent
  // },
  {
    path: 'category/:id',
    component: CategoryComponent,
    runGuardsAndResolvers: 'always',
  }, {
    path: 'article/:id',
    component: ArticleViewComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'pub',
    component: PubComponent
  },
  {
    path: 'qui-somme-nous',
    component: WhoAreUsComponent
  },
  {
    path: 'presse-sogift',
    component: SoGiftComponent
  }, {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/articles',
    component: ArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/articles/add',
    component: ArticlesAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/articles/edit/:id',
    component: ArticlesEditComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/add',
    component: CategoriesAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/edit/:id',
    component: CategoriesEditComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
