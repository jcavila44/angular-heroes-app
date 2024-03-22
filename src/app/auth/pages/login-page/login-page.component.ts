import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styles: ``
})
export class LoginPageComponent {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    onCLickLogin(): void {

        this._authService.login('Jose@das.com', '123')
            .subscribe((user) => {
                console.log(user);
                this._router.navigate(['/']);

            })

    }

}
