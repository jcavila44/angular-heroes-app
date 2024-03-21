import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    private _checkAuthStatus(): Observable<boolean> | boolean {
        return this._authService.checkAuthentication$()
            .pipe(
                tap((isAuthenticated) => { console.error('Authenticated:', isAuthenticated) }),
                tap((isAuthenticated) => {
                    if (!isAuthenticated) this._router.navigate(['/auth/login'])
                })

            );
    }

    canMatch(): boolean | Observable<boolean> {
        return this._checkAuthStatus();
    }

    canActivate(): boolean | Observable<boolean> {
        return this._checkAuthStatus();
    }




}
