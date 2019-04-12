import { Component, OnInit } from '@angular/core';
import Articles from 'src/app/models/articles';
import { ArticlesService } from '../../services/articles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Articles[];
  users: any;
  constructor(private articlesService: ArticlesService, private usersService: UsersService) { }

  ngOnInit() {
    this.articlesService
      .getAll()
      .subscribe((r: any) => {
        this.articles = r.data;
      });
    this.usersService.getAll().subscribe((result: any) => {
      this.users = result.data;
    });
  }

}
