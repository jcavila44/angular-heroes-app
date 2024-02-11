export interface IHero {
    id: string;
    superhero: string;
    publisher: IPublisher;
    alter_ego: string;
    first_appearance: string;
    characters: string;
    alt_img?: string;
}

export enum IPublisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
