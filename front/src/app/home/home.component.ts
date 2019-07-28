import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService, DealsService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    users: any;

    constructor(
        private router: Router, private userService: UserService, private dealsService: DealsService, private zone: NgZone) { }

    ngOnInit() {
        const userC = localStorage.getItem('currentUser')
        console.log('HOME COMPONENT', userC)
        this.users = this.userService.getAll()
    }
}
