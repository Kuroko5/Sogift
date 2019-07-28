import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Articles from '../../models/articles';
import { ArticlesService } from '../../services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit {
  article: any;
  categories: any;
  constructor(private articlesService: ArticlesService, private router: Router,
    private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    if (Object.keys(this.route.params['value']).length > 0) {
      this.route.params
        .subscribe(params => {
          this.articlesService.getOne(params['id'])
            .subscribe((result: any) => {
              if (result) {
                this.article = result;
              }
            });
          this.getAllCategory();

        });
    }
  }
  getAllCategory() {
    this.categoriesService.getAll(9999999999).subscribe((result: any) => {
      if (result || result.data) {
        this.categories = result;
      }
    });
  }
  edit(article) {
    if (article && article.title && article.subtitle && article.categories && article.cover && article.description) {
      this.articlesService.update(article._id, article)
        .subscribe(c => {
          alert('Votre article a bien été edité');
          return this.router.navigateByUrl('/admin/articles');
        });
    } else {
      alert('votre article n\'est pas complet');
    }
  }
}
