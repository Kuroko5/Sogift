import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  pagination: any;
  items = 9999999999;

  displayedColumns: string[] = ['name', 'description', 'color', 'icon'];

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
        console.log('CAtegories ', result)
        if (result) {
          this.categories = result;
          console.log(this.categories)
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
