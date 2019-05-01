import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  logged() {
    return this.authService.isLogged();
  }

}
