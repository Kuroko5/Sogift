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
      .subscribe((data: Articles[]) => {
        console.log(data)
        this.articles = data;
      });
    this.usersService.getAll().subscribe((result) => {
      console.log(result.data)
      this.users = result.data;
    });
  }

}
