import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { GoogleAuthService } from 'ng-gapi';
import { GoogleApiService } from 'ng-gapi';
import { UserService } from '../../services/user.service';

//declare var gapi : any;

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {

  constructor(private router: Router,
    private zone: NgZone,
    private userService: UserService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService
  ) {
    this.gapiService.onLoad().subscribe();
    this.authService.getAuth().subscribe((auth) => {
      console.log('Is SignedIn = ' + auth.isSignedIn.get());
      if(auth.isSignedIn.get()){
        this.userService.signInSuccessHandler(auth.currentUser.get());
        this.zone.run(()=>this.router.navigate(['dashboard']));
      }
    });
   }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  public socialSignIn() {
    this.userService.signIn();
  }

  ngOnInit() {

    setTimeout(() => {
      if(this.isLoggedIn()){
        this.router.navigate(['/dashboard']);
      }
    },200);

  }
}
