import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesAddComponent } from './articles/articles-add/articles-add.component';
import { ArticlesEditComponent } from './articles/articles-edit/articles-edit.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_guard/auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
