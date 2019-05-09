import { Component, OnInit } from '@angular/core';
import Articles from '../models/articles';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Articles[];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService
      .getAll(999999999999)
      .subscribe((result: any) => {
        this.articles = result.data;
      });
  }
  delete(id) {
    this.articlesService.delete(id)
      .subscribe((result) => {
        location.reload();
      });
  }
}
