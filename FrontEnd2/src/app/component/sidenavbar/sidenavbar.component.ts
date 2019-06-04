import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logged() {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
    return this.router.navigateByUrl('/home');
  }

}
