import { Component, Input } from '@angular/core';
import { Hero } from '../../../interfaces/hero';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-card-list',
  standalone: true,
  imports: [HeroCardComponent, CommonModule],
  templateUrl: './hero-card-list.component.html',
  styleUrl: './hero-card-list.component.scss',
})
export class HeroCardListComponent {
  @Input() dataSource: Hero[] = [];

  constructor() {}
}
