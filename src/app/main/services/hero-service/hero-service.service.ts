import { Injectable } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      subtitle: 'The Man of Steel',
      color: `rgb(255, 0, 0)`,
    },
    {
      id: 2,
      name: 'Batman',
      subtitle: 'The Dark Knight',
      color: `rgb(0, 0, 0)`,
    },
    {
      id: 3,
      name: 'Wonder Woman',
      subtitle: 'The Amazon Warrior',
      color: `rgb(255, 50, 50)`,
    },
    {
      id: 4,
      name: 'Spider-Man',
      subtitle: 'The Friendly Neighborhood Spider-Man',
      color: `rgb(255, 0, 200)`,
    },
    {
      id: 5,
      name: 'Iron Man',
      subtitle: 'The Armored Avenger',
      color: `rgb(255, 0, 0)`,
    },
    {
      id: 6,
      name: 'The Flash',
      subtitle: 'The Fastest Man Alive',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 7,
      name: 'Green Lantern',
      subtitle: 'The Galactic Peacekeeper',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 8,
      name: 'Black Widow',
      subtitle: 'The Master Spy',
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 9,
      name: 'Thor',
      subtitle: 'The God of Thunder',
      color: 'rgb(0, 0, 255)',
    },
    {
      id: 10,
      name: 'Hulk',
      subtitle: 'The Green Goliath',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 11,
      name: 'Captain America',
      subtitle: 'The Star-Spangled Man with a Plan',
      color: 'rgb(0, 0, 255)',
    },
    {
      id: 12,
      name: 'Hawkeye',
      subtitle: "The World's Greatest Marksman",
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 13,
      name: 'Black Panther',
      subtitle: 'The Protector of Wakanda',
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 14,
      name: 'Doctor Strange',
      subtitle: 'The Sorcerer Supreme',
      color: 'rgb(255, 0, 255)',
    },
    {
      id: 15,
      name: 'Aquaman',
      subtitle: 'The King of the Seven Seas',
      color: 'rgb(0, 255, 255)',
    },
    {
      id: 16,
      name: 'Cyborg',
      subtitle: 'The Technological Titan',
      color: 'rgb(75, 75, 75)',
    },
    {
      id: 17,
      name: 'Green Arrow',
      subtitle: 'The Emerald Archer',
      color: 'rgb(0, 128, 0)',
    },
    {
      id: 18,
      name: 'Scarlet Witch',
      subtitle: 'The Master of Chaos Magic',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 19,
      name: 'Vision',
      subtitle: 'The Synthetic Avenger',
      color: 'rgb(255, 105, 180)',
    },
    {
      id: 20,
      name: 'Ant-Man',
      subtitle: 'The Incredible Shrinking Hero',
      color: 'rgb(192, 192, 192)',
    },
    {
      id: 21,
      name: 'Wasp',
      subtitle: 'The Tiny Avenger',
      color: 'rgb(255, 215, 0)',
    },
    {
      id: 22,
      name: 'Captain Marvel',
      subtitle: 'The Warrior Hero',
      color: 'rgb(255, 69, 0)',
    },
    {
      id: 23,
      name: 'Shazam',
      subtitle: "The World's Mightiest Mortal",
      color: 'rgb(255, 215, 0)',
    },
    {
      id: 24,
      name: 'Supergirl',
      subtitle: 'The Girl of Steel',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 25,
      name: 'Nightwing',
      subtitle: 'The Acrobatic Assailant',
      color: 'rgb(0, 0, 139)',
    },
    {
      id: 26,
      name: 'Daredevil',
      subtitle: 'The Man Without Fear',
      color: 'rgb(139, 0, 0)',
    },
    {
      id: 27,
      name: 'Jessica Jones',
      subtitle: 'The Private Investigator',
      color: 'rgb(105, 105, 105)',
    },
    {
      id: 28,
      name: 'Luke Cage',
      subtitle: 'The Power Man',
      color: 'rgb(165, 42, 42)',
    },
    {
      id: 29,
      name: 'Iron Fist',
      subtitle: 'The Living Weapon',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 30,
      name: 'Moon Knight',
      subtitle: 'The Crescent Crusader',
      color: 'rgb(255, 150, 150)',
    },
  ];

  private heroes$ = new BehaviorSubject<Hero[]>(this.heroes);
  private selectedHero$ = new BehaviorSubject<Hero | undefined>(undefined);

  constructor() {}

  getHeroById(id: number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  refreshHeroes(): void {
    this.heroes$.next(this.heroes);
  }

  addHero(hero: Hero): void {
    this.heroes.push(hero);
    this.refreshHeroes();
  }

  updateHero(hero: Hero): void {
    const index = this.heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      this.heroes[index] = hero;
    }

    this.refreshHeroes();
  }

  deleteHero(id: number): void {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.heroes = this.heroes.map((hero, i) => ({
        ...hero,
        id: i + 1,
      }));
    }

    this.refreshHeroes();
  }

  getHeroNames(inputValue: string): Hero[] {
    return this.heroes.filter((hero) =>
      hero.name.toUpperCase().includes(inputValue.toUpperCase())
    );
  }

  setSelectedHero(hero: Hero): void {
    this.selectedHero$.next(hero);
  }

  getSelectedHero(): Observable<Hero | undefined> {
    return this.selectedHero$.asObservable();
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }
}
