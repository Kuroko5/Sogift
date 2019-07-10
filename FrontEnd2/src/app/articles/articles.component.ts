import { Component, OnInit } from '@angular/core';

import Articles from '../models/articles';
import { ArticlesService } from '../services/articles.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any[];
  displayedColumns: string[] = ['title', 'description'];
  pagination:any;
  items = 9999999999;
  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.all(this.items);
  }

  itemChange(item: number): void {
    this.items = item;
    this.all(this.itemChange);
  }
  all(items) {
    this.articlesService
      .getAll(items)
      .subscribe((result: any) => {
        if (result) {
          console.log('result of pagination ', result)
          this.articles = result.data;
          this.pagination = result.pagination;
        }
      });
  }
  delete(id) {
    this.articlesService.delete(id)
      .subscribe((result) => {
        location.reload();
      });
  }
}
