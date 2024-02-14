import { Router, RouterOutlet } from '@angular/router';
import { HeroService } from '../../services/hero-service/hero-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroTableComponent } from './hero-table/hero-table.component';
import { SlideToggleComponent } from '../../../shared/components/slide-toggle/slide-toggle.component';
import { HeroCardListComponent } from './hero-card-list/hero-card-list.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroTableComponent,
    SlideToggleComponent,
    HeroCardListComponent,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  heroes: Hero[] = [];
  toggleValue: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly heroService: HeroService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.heroes = this.heroService.getHeroNames(this.inputValue);
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((heroes) => {
        this.heroes = this.heroService.getHeroNames(this.inputValue);
      });
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value;
    this.heroes = this.heroService.getHeroNames(this.inputValue);
  }

  onToggleChange(checked: boolean) {
    this.toggleValue = checked;
  }

  addNewHero() {
    this.heroService.setSelectedHero({
      id: -1,
      name: '',
      subtitle: '',
      color: '',
    });
    this.router.navigate(['edit-hero']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
