import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { IHero } from '../../interfaces/hero.interface';

@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styles: ``
})
export class ListPageComponent implements OnInit {

    public heroes: IHero[] = [];

    constructor(private heroesService: HeroesService) { }

    ngOnInit(): void {
        this.heroesService.getHeroes$()
            .subscribe((heroes) => this.heroes = heroes);
    }

}
