import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-layout-page',
    templateUrl: './layout-page.component.html',
    styles: ``
})
export class LayoutPageComponent {

    constructor(
        private _authService: AuthService,

    ) {

    }

    public sidebarItems = [
        { label: 'Listado', icon: 'label', url: './list' },
        { label: 'Añadir', icon: 'add', url: './new-hero' },
        { label: 'Buscar', icon: 'search', url: './search' },
    ]


    onLogout(): void {
        this._authService.logout();
    }


    get getUserName() {
        return this._authService.getCurrentUSer?.user;
    }

}
