import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {

  categories: any = {};

  constructor(private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  create(category) {
    if (category && category.name && category.description && category.icon && category.color ) {
      this.categoriesService.create(category)
        .subscribe(c => {
          console.log('category Created', c);
          return this.router.navigateByUrl('/admin/categories');
        });
    } else {
      alert('votre categorie n\'est pas correct, Veuillez verifié les informations saisies');
    }
  }
}
