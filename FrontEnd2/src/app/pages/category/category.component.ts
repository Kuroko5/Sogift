import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  currentCategory: any;
  currentId: any;
  navigationSubscription;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private articlesService: ArticlesService, private categoriesService: CategoriesService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('id');
    });
    if (this.currentId) {
      await this.getDetailCategory(this.currentId);
    }
  }

  async getDetailCategory(id: any) {
    await this.categoriesService.getOne(id)
      .subscribe(async (result: any) => {
        if (result) {
          await this.articlesService.getFromCategory(result._id).subscribe((articles: any) => result.articles = articles.data);
          this.currentCategory = result;
        }
      });
  }
}
