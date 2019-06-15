import { Component, OnInit } from '@angular/core';
import Articles from 'src/app/models/articles';
import { ArticlesService } from '../../services/articles.service';
import { UsersService } from '../../services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lastArticles: Articles[];
  users: any;
  itemsA = 6;
  DEFAULT_NUMBER = 999999;
  categories = [];
  bestCategory = ['food', 'drink', 'song'];
  articleFood = [];
  articleDrink = [];
  articleSong = [];
  constructor(private articlesService: ArticlesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getLastArticle();
    this.getAllcategory();
  }

  getLastArticle() {
    this.articlesService
      .getAll(this.itemsA)
      .subscribe((r: any) => {
        this.lastArticles = r.data;
      });
  }

  getBestCategory() {
    this.bestCategory.map((e)=>{
      this.categoriesService.getOne(e)
    })
  }
  getAllcategory() {
    this.categoriesService.getAll(this.DEFAULT_NUMBER)
      .subscribe((r: any) => {
        this.categories = r;
      });
  }

}
