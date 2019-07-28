import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  nbArticles;
  nbCategories;
  constructor(private articlesService: ArticlesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.countAllData()
  }
  countAllData() {
    this.articlesService.getAll(999999999).subscribe((result: any) => {
      console.log(result)
      if (result) {
        this.nbArticles = result.data.length;
      }
    });
    this.categoriesService.getAll(999999999).subscribe((result: any) => {
      console.log(result)
      if (result) {
        this.nbCategories = result.length;
      }
    });
  }

}
