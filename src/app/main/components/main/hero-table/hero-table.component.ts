import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../../interfaces/hero';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HeroServiceWithApiService } from '../../../services/hero-service-with-api/hero-service-with-api.service';

@Component({
  selector: 'app-hero-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent {
  @Input() dataSource: Hero[] = [];
  displayedColumns: string[] = ['id', 'name', 'subtitle', 'options'];

  constructor(
    private readonly heroService: HeroServiceWithApiService,
    private readonly router: Router
  ) {}

  editHero(hero: Hero): void {
    this.heroService.setSelectedHero(hero);
    this.router.navigateByUrl('edit-hero');
  }

  // Method to handle deleting a hero
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe((heroes) => {
      this.heroService.refreshHeroes(heroes);
    });
  }
}
