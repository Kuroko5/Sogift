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
  best = [];
  articleFood: any;
  articleDrink: any;
  articleSong: any;
  constructor(private articlesService: ArticlesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getLastArticle();
    this.getAllcategory();
   // this.getBestCategory();
  }

  getLastArticle() {
    this.articlesService
      .getAll(this.itemsA)
      .subscribe((r: any) => {
        this.lastArticles = r.data;
      });
  }

  getBestCategory() {
    this.bestCategory.map((e) => {
      this.categoriesService.getByName(e).subscribe((result: any) => {
        console.log('reesult cates ', result);
        if (result.name === 'food') {
          this.articlesService.getFromCategory(result._id).subscribe((r: any) => {
            this.articleFood.category = result;
            this.articleFood.articles = r.data;
          });
        } else if (result.name === 'song') {
          this.articlesService.getFromCategory(result._id).subscribe((r: any) => {
            this.articleSong.category = result;
            this.articleSong.articles = r.data;
          });
        } else if (result.name === 'drink') {
          this.articlesService.getFromCategory(result._id).subscribe((r: any) => {
            this.articleDrink.category = result;
            this.articleDrink.articles = r.data;
          });
        }
      });
    });
  }

  async getAllcategory() {
    this.categoriesService.getAll(this.DEFAULT_NUMBER)
      .subscribe(async (result: any) => {
        await result.map((r) => {
          this.articlesService.getFromCategory(r._id).subscribe((articles: any) => r.articles = articles.data);
        });
        this.categories = result;
      });
  }
}
