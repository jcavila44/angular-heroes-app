import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { IHero } from '../../interfaces/hero.interface';

@Component({
    selector: 'app-hero-page',
    templateUrl: './hero-page.component.html',
    styles: ``
})
export class HeroPageComponent implements OnInit {

    public hero?: IHero;

    constructor(
        private heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router

    ) {

    }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(switchMap(                                                //Lo pasamos por el pipe switchMap que me permite tomar los parametros y ejecutar un servicio
                ({ id }) => this.heroesService.getHeroById$(id)             //Llamamos al observable del servicio
            ))
            .subscribe((hero) => {                                          //Nos subscribimos y esperamos la respuesta de hero
                if (!hero) return this.router.navigate(['/heroes/list'])    //En caso de que no traiga un heroe lo devuelve al listado

                this.hero = hero;
                return;
            });
    }


    onClickGoBack(): void {
        this.router.navigateByUrl('heroes/list')
    }


}
