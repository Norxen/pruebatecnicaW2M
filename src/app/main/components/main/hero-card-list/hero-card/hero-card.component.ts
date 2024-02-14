import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Hero } from '../../../../interfaces/hero';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../../../services/hero-service/hero-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero: Hero = {
    id: 0,
    name: 'Superman',
    subtitle: 'El Hombre Araña',
    color: `rgb(200,0,0)`,
  };
  hoverBoxShadow: string = '';
  defaultBoxShadow: string = '0 4px 8px rgba(0,0,0,0.2)';

  constructor(
    private readonly heroService: HeroService,
    private readonly router: Router
  ) {}

  deleteHero() {
    this.heroService.deleteHero(this.hero.id);
  }

  goToEditHero() {
    this.heroService.setSelectedHero(this.hero);
    this.router.navigateByUrl('edit-hero');
  }

  //Animations
  setHoverBoxShadow(color: string): void {
    this.hoverBoxShadow = `0 8px 24px ${color}`;
  }

  clearBoxShadow(): void {
    this.hoverBoxShadow = this.defaultBoxShadow;
  }
}
