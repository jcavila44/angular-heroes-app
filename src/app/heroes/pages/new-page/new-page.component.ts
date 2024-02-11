import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IHero, IPublisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styles: ``
})
export class NewPageComponent implements OnInit {


    public heroForm = new FormGroup({
        id: new FormControl<string>(''),
        superhero: new FormControl<string>('', { nonNullable: true }),
        publisher: new FormControl<IPublisher>(IPublisher.DCComics),
        alter_ego: new FormControl<string>(''),
        first_appearance: new FormControl<string>(''),
        characters: new FormControl<string>(''),
        alt_img: new FormControl<string>(''),
    })


    public publishers = [
        { id: 'DC Comics', desc: 'DC - Comics' },
        { id: 'Marvel Comics', desc: 'MArvel - Comics' }
    ]


    constructor(
        private heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        if (!this.router.url.includes('edit')) return;

        this.activatedRoute.params
            .pipe(
                switchMap(({ id }) => this.heroesService.getHeroById$(id))
            ).subscribe((hero) => {
                if (!hero) return this.router.navigateByUrl('/');
                this.heroForm.reset(hero);
                return;
            })

    }

    get getCurrentHero(): IHero {
        const hero = this.heroForm.value as IHero;
        return hero;
    }


    onSubmit(): void {

        if (this.heroForm.invalid) return;
        if (this.getCurrentHero.id) {
            this.heroesService.updateHero$(this.getCurrentHero)
                .subscribe((hero) => {
                    this.showSnackBar(`${hero.superhero} updated!`);
                });
            return;
        }


        this.heroesService.addHero$(this.getCurrentHero)
            .subscribe((hero) => {
                this.router.navigate(['/heroes/edit', hero.id]);
                this.showSnackBar(`${hero.superhero} created!`);
            });


    }


    showSnackBar(message: string): void {
        this.snackbar.open(message, 'done', {
            duration: 2500
        })

    }


}
