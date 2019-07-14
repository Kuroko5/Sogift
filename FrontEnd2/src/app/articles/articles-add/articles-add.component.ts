import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Articles from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-articles-add',
  templateUrl: './articles-add.component.html',
  styleUrls: ['./articles-add.component.scss']
})
export class ArticlesAddComponent implements OnInit {
  article: any = {};
  categories: any;

  constructor(private articlesService: ArticlesService, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  create(article) {
    if (article && article.title && article.subtitle && article.categories && article.cover && article.description) {
      this.articlesService.create(article)
        .subscribe(c => {
          console.log('Article Created', c);
          return this.router.navigateByUrl('/admin/articles');
        });
    } else {
      alert('votre article n\'est pas complet');
    }
  }
  getAllCategory() {
    this.categoriesService.getAll(9999999999).subscribe((result: any) => {
      if (result || result.data) {
        this.categories = result;
      }
    });
  }
}
