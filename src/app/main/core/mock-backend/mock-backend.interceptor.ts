// Mock Backend Interceptor
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';
import { Hero, HeroSearchResponse } from '../../interfaces/hero';
import { environment } from '../../../../environment/environment.prod';
import { LoadingService } from '../../services/loading-service/loading.service';
import { Injectable } from '@angular/core';

@Injectable()
export class mockBackendInterceptor implements HttpInterceptor {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'SUPERMAN',
      subtitle: 'THE MAN OF STEEL',
      color: `rgb(255, 0, 0)`,
    },
    {
      id: 2,
      name: 'BATMAN',
      subtitle: 'THE DARK KNIGHT',
      color: `rgb(0, 0, 0)`,
    },
    {
      id: 3,
      name: 'WONDER WOMAN',
      subtitle: 'THE AMAZON WARRIOR',
      color: `rgb(255, 50, 50)`,
    },
    {
      id: 4,
      name: 'SPIDER-MAN',
      subtitle: 'THE FRIENDLY NEIGHBORHOOD SPIDER-MAN',
      color: `rgb(255, 0, 200)`,
    },
    {
      id: 5,
      name: 'IRON MAN',
      subtitle: 'THE ARMORED AVENGER',
      color: `rgb(255, 0, 0)`,
    },
    {
      id: 6,
      name: 'THE FLASH',
      subtitle: 'THE FASTEST MAN ALIVE',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 7,
      name: 'GREEN LANTERN',
      subtitle: 'THE GALACTIC PEACEKEEPER',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 8,
      name: 'BLACK WIDOW',
      subtitle: 'THE MASTER SPY',
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 9,
      name: 'THOR',
      subtitle: 'THE GOD OF THUNDER',
      color: 'rgb(0, 0, 255)',
    },
    {
      id: 10,
      name: 'HULK',
      subtitle: 'THE GREEN GOLIATH',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 11,
      name: 'CAPTAIN AMERICA',
      subtitle: 'THE STAR-SPANGLED MAN WITH A PLAN',
      color: 'rgb(0, 0, 255)',
    },
    {
      id: 12,
      name: 'HAWKEYE',
      subtitle: "THE WORLD'S GREATEST MARKSMAN",
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 13,
      name: 'BLACK PANTHER',
      subtitle: 'THE PROTECTOR OF WAKANDA',
      color: 'rgb(0, 0, 0)',
    },
    {
      id: 14,
      name: 'DOCTOR STRANGE',
      subtitle: 'THE SORCERER SUPREME',
      color: 'rgb(255, 0, 255)',
    },
    {
      id: 15,
      name: 'AQUAMAN',
      subtitle: 'THE KING OF THE SEVEN SEAS',
      color: 'rgb(0, 255, 255)',
    },
    {
      id: 16,
      name: 'CYBORG',
      subtitle: 'THE TECHNOLOGICAL TITAN',
      color: 'rgb(75, 75, 75)',
    },
    {
      id: 17,
      name: 'GREEN ARROW',
      subtitle: 'THE EMERALD ARCHER',
      color: 'rgb(0, 128, 0)',
    },
    {
      id: 18,
      name: 'SCARLET WITCH',
      subtitle: 'THE MASTER OF CHAOS MAGIC',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 19,
      name: 'VISION',
      subtitle: 'THE SYNTHETIC AVENGER',
      color: 'rgb(255, 105, 180)',
    },
    {
      id: 20,
      name: 'ANT-MAN',
      subtitle: 'THE INCREDIBLE SHRINKING HERO',
      color: 'rgb(192, 192, 192)',
    },
    {
      id: 21,
      name: 'WASP',
      subtitle: 'THE TINY AVENGER',
      color: 'rgb(255, 215, 0)',
    },
    {
      id: 22,
      name: 'CAPTAIN MARVEL',
      subtitle: 'THE WARRIOR HERO',
      color: 'rgb(255, 69, 0)',
    },
    {
      id: 23,
      name: 'SHAZAM',
      subtitle: "THE WORLD'S MIGHTIEST MORTAL",
      color: 'rgb(255, 215, 0)',
    },
    {
      id: 24,
      name: 'SUPERGIRL',
      subtitle: 'THE GIRL OF STEEL',
      color: 'rgb(255, 0, 0)',
    },
    {
      id: 25,
      name: 'NIGHTWING',
      subtitle: 'THE ACROBATIC ASSAILANT',
      color: 'rgb(0, 0, 139)',
    },
    {
      id: 26,
      name: 'DAREDEVIL',
      subtitle: 'THE MAN WITHOUT FEAR',
      color: 'rgb(139, 0, 0)',
    },
    {
      id: 27,
      name: 'JESSICA JONES',
      subtitle: 'THE PRIVATE INVESTIGATOR',
      color: 'rgb(105, 105, 105)',
    },
    {
      id: 28,
      name: 'LUKE CAGE',
      subtitle: 'THE POWER MAN',
      color: 'rgb(165, 42, 42)',
    },
    {
      id: 29,
      name: 'IRON FIST',
      subtitle: 'THE LIVING WEAPON',
      color: 'rgb(0, 255, 0)',
    },
    {
      id: 30,
      name: 'MOON KNIGHT',
      subtitle: 'THE CRESCENT CRUSADER',
      color: 'rgb(255, 150, 150)',
    },
  ];

  constructor(private readonly loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (environment.isMockEnabled) {
      this.loadingService.setLoading(true);
      const randomDelay = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
      return this.handleGetHeroes(req, next).pipe(
        delay(randomDelay),
        tap(() => {
          console.log('Request completed'); //This debug commentary was added because its so useful to know that I'm only doing one request at a time.
          this.loadingService.setLoading(false);
        })
      );
    }
    return next.handle(req);
  }

  private handleGetHeroes(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //If the request is a GET from the heroes endpoint to get a list of heroes
    // Example: url/heroes
    if (req.url.endsWith('heroes') && req.method === 'GET') {
      //Return list of heroes
      const fakeResponse = new HttpResponse({
        status: 200,
        body: { heroes: this.heroes },
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    //If the request is a GET from the heroes endpoint to get a specific Hero by ID
    // Example: url/heroes/1
    if (req.url.match(/\/heroes\/\d+$/) && req.method === 'GET') {
      //Extract the ID from the URL
      const urlParts = req.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);

      //Find the hero with the matching ID
      const hero = this.heroes.find((hero) => hero.id === id);

      //Return the hero
      const fakeResponse = new HttpResponse({
        status: 200,
        body: hero,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    //If the request is a POST to the heroes endpoint to add a new hero
    // Example: url/heroes
    if (req.url.endsWith('heroes') && req.method === 'POST') {
      //Extract the hero from the request body
      const hero = req.body;
      //Update the ID of the hero to add it at the end of the list
      hero.id = this.heroes.length + 1;
      //Add the hero to the list
      this.heroes.push(hero);
      //Return the hero
      const fakeResponse = new HttpResponse({
        status: 200,
        body: { heroes: this.heroes },
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    //If the request is a PUT to the heroes endpoint to update a hero
    // Example: url/heroes/update/1
    if (req.url.match(/\/heroes\/update\/\d+$/) && req.method === 'PUT') {
      //Extract the ID from the URL
      const urlParts = req.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);

      //Extract the hero from the request body
      const hero = req.body;
      //Find the index of the hero with the matching ID
      const index = this.heroes.findIndex((h) => h.id === id);
      //Update the hero in the list
      this.heroes[index] = hero;
      //Return the hero
      const fakeResponse = new HttpResponse({
        status: 200,
        body: { heroes: this.heroes },
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    //If the request is a DELETE to the heroes endpoint to delete a hero
    // Example: url/heroes/delete/1
    if (req.url.match(/\/heroes\/delete\/\d+$/) && req.method === 'DELETE') {
      //Extract the ID from the URL
      const urlParts = req.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1]);

      //Find the index of the hero with the matching ID
      const index = this.heroes.findIndex((h) => h.id === id);
      //Remove the hero from the list
      this.heroes.splice(index, 1);
      //Update the IDs of the heroes in the list
      this.heroes = this.heroes.map((hero, i) => ({
        ...hero,
        id: i + 1,
      }));
      //Return the hero
      const fakeResponse = new HttpResponse({
        status: 200,
        body: { heroes: this.heroes },
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    //If the request is a GET to the heroes endpoint to get a list of heroes that contains a string in their name and with pagination
    // Example: url/heroes/search?name=man&page=1&limit=5
    if (
      req.url.match(/\/heroes\/search\?name=\w*&page=\d+&limit=\d+$/) &&
      req.method === 'GET'
    ) {
      //Extract the name, page and limit from the URL
      const urlParts = req.url.split('?');
      const params = urlParts[1].split('&');
      const name = params[0].split('=')[1];
      const page = parseInt(params[1].split('=')[1]);
      const limit = parseInt(params[2].split('=')[1]);

      //Filter the heroes that contain the name in their name
      const filteredHeroes = this.heroes.filter((hero) =>
        hero.name.toLowerCase().includes(name.toLowerCase())
      );

      //Paginate the heroes
      const paginatedHeroes = filteredHeroes.slice(
        (page - 1) * limit,
        page * limit
      );

      const heroResponse: HeroSearchResponse = {
        heroes: paginatedHeroes,
        total: filteredHeroes.length,
      };
      //Return the heroes
      const fakeResponse = new HttpResponse({
        status: 200,
        body: heroResponse,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });

      return of(fakeResponse);
    }

    return next.handle(req);
  }
}
