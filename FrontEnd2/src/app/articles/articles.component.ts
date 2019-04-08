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
      .getAll()
      .subscribe((data: Articles[]) => {
        console.log(data)
        this.articles = data;

    });
  }

}
