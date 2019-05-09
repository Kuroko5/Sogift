import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Articles from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles-add',
  templateUrl: './articles-add.component.html',
  styleUrls: ['./articles-add.component.scss']
})
export class ArticlesAddComponent implements OnInit {
  article: any = {};

  constructor(private articlesService: ArticlesService,private router: Router) { }

  ngOnInit() {
  }

  create(article){
    this.articlesService.create(article)
    .subscribe(c => {
      console.log('Article Created', c);
      return this.router.navigateByUrl('/admin/articles');
    });
  }
}
