import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../../../interfaces/hero';
import { HeroService } from '../../../../services/hero-service/hero-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent {
  heroForm!: FormGroup;
  hero: Hero = {
    id: -1,
    name: '',
    subtitle: '',
    color: '#0000FF',
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly heroService: HeroService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      name: [this.hero?.name || '', Validators.required],
      subtitle: [this.hero?.subtitle || '', Validators.required],
      color: [this.hero?.color || '#0000FF'],
    });
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const formValues = this.heroForm.value;

      const createdHero: Hero = {
        id: this.hero.id,
        name: formValues.name,
        subtitle: formValues.subtitle,
        color: formValues.color,
      };

      this.heroService.addHero(createdHero);
      this.router.navigateByUrl('main');
    }
  }

  onCancel() {
    this.router.navigateByUrl('main');
  }
}
