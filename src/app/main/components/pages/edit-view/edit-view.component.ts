import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../interfaces/hero';
import { CreateFormComponent } from './create-form/create-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CommonModule } from '@angular/common';
import { HeroServiceWithApiService } from '../../../services/hero-service-with-api/hero-service-with-api.service';

@Component({
  selector: 'app-edit-view',
  standalone: true,
  imports: [CreateFormComponent, EditFormComponent, CommonModule],
  templateUrl: './edit-view.component.html',
  styleUrl: './edit-view.component.scss',
})
export class EditViewComponent implements OnInit {
  hero!: Hero;
  isCreating: boolean = true;

  constructor(private readonly heroService: HeroServiceWithApiService) {}

  ngOnInit(): void {
    this.heroService.getSelectedHero().subscribe((value) => {
      if (value != undefined && value.id < 0) {
        this.isCreating = true;
      } else {
        this.isCreating = false;
      }
    });
  }
}
