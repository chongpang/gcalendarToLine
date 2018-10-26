import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { GoogleAuthService } from '../../../../node_modules/ng-gapi';
import { timeout } from '../../../../node_modules/@types/async';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private zone: NgZone,
    private authService: GoogleAuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/dashboard']);
  }
  
  goSetting(){
    this.router.navigate(['/setting']);
  }

  socialSignOut() {

    this.userService.signOut();

    setTimeout(() => {
	if(!this.userService.isUserSignedIn()){
      	  this.router.navigate(['/sigin']);
	}
    },1500);
  }

}
