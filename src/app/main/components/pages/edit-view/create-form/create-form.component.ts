import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../../../interfaces/hero';
import { Router } from '@angular/router';
import { HeroServiceWithApiService } from '../../../../services/hero-service-with-api/hero-service-with-api.service';
import { UppercaseDirective } from '../../../../../shared/directives/uppercase.directive';

// This component is used to create a new hero
// It uses a reactive form to handle the input fields
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
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
    private readonly heroService: HeroServiceWithApiService
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

  // This method is called when the form is submitted
  // It validates the form and then creates a new hero and sends it to the server
  onSubmit() {
    if (this.heroForm.valid) {
      const formValues = this.heroForm.value;

      const createdHero: Hero = {
        id: this.hero.id,
        name: formValues.name,
        subtitle: formValues.subtitle,
        color: formValues.color,
      };

      this.heroService.addHero(createdHero).subscribe((heroes) => {
        this.router.navigateByUrl('main');
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('main');
  }
}
