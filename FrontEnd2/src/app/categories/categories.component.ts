import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  pagination: any;
  items = 9999999999;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.all(this.items);
  }

  itemChange(item: number): void {
    this.items = item;
    this.all(this.itemChange);
  }
  all(items) {
    this.categoriesService
      .getAll(items)
      .subscribe((result: any) => {
        if (result) {
          this.categories = result.data;
          this.pagination = result.pagination;
        }
      });
  }
  delete(id) {
    this.categoriesService.delete(id)
      .subscribe((result) => {
        alert('la categorie a bien été supprimé');
        location.reload();
      });
  }
}
