import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {
  events: string[] = [];
  opened = false;
  categories: [];

  constructor(private authService: AuthService, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.allCategories();
    console.log('opened', this.opened);
  }

  logged() {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
    return this.router.navigateByUrl('/home');
  }

  allCategories() {
    this.categoriesService.getAll(9999999)
      .subscribe((result: any) => {
        this.categories = result;
      });
  }
}
