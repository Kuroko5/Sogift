import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Articles from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit {
  article: any;
  constructor(private articlesService: ArticlesService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (Object.keys(this.route.params['value']).length > 0) {
      this.route.params
        .subscribe(params => this.articlesService
          .getOne(params['id'])
          .subscribe((result: any) => {
            this.article = result;
          }));
    }
  }

}
