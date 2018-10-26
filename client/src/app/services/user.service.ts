import {Injectable, NgZone} from "@angular/core";
import * as _ from "lodash";
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    public static readonly SESSION_STORAGE_EMAIL: string = "current_email";
    private user: GoogleUser = undefined;

    constructor(private router: Router,
		private googleAuthService: GoogleAuthService,
                private ngZone: NgZone) {
    }

    public setUser(user: GoogleUser): void {
        this.user = user;
    }

    public getCurrentUser(): GoogleUser {
        return this.user;
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    public signIn() {
        this.googleAuthService.getAuth().subscribe((auth) => {
            auth.signIn().then(res => {this.signInSuccessHandler(res); console.log(res)}, err => this.signInErrorHandler(err));
        });
    }

    //TODO: Rework
    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
            sessionStorage.removeItem(UserService.SESSION_STORAGE_EMAIL)
        });
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(UserService.SESSION_STORAGE_KEY));
    }

    public signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            sessionStorage.setItem(
                UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );

            sessionStorage.setItem(
                UserService.SESSION_STORAGE_EMAIL, res.getBasicProfile().getEmail()
            );

	    this.router.navigate(['dashboard']);
        });
    }

    public getEmail(){
        let email: string = sessionStorage.getItem(UserService.SESSION_STORAGE_EMAIL);
        if (!email) {
            throw new Error("no email found , authentication required");
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_EMAIL);
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }
}
