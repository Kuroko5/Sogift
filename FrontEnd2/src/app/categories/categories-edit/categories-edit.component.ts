import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {
  category: any;
  categories: any;
  constructor(private router: Router, private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    if (Object.keys(this.route.params['value']).length > 0) {
      this.route.params
        .subscribe(params => {
          // tslint:disable-next-line:no-string-literal
          this.categoriesService.getOne(params['id'])
            .subscribe((result: any) => {
              if (result) {
                this.category = result;
              }
            });
        });
    }
  }

  edit(category) {
    if (category && category.name && category.icon && category.color && category.description) {
      this.categoriesService.update(category._id, category)
        .subscribe(c => {
          alert('Votre category a bien été edité');
          return this.router.navigateByUrl('/admin/categories');
        });
    } else {
      alert('votre article n\'est pas complet');
    }
  }
}
