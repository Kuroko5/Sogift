import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit, OnDestroy {

  currentArticle: any;
  colorArticle: any;
  currentId: any;
  navigationSubscription;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private articlesService: ArticlesService) {
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
      await this.getArticle(this.currentId);
    }
  }

  async getArticle(id: any) {
    await this.articlesService.getOne(id)
      .subscribe(async (result: any) => {
        this.currentArticle = result;
        if (this.currentArticle && this.currentArticle.categories.length) {
          this.colorArticle = this.currentArticle.categories[0].color;
        }
      });
  }
}
