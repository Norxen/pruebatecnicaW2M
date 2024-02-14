import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../../../interfaces/hero';
import { Router } from '@angular/router';
import { HeroService } from '../../../../services/hero-service/hero-service.service';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnInit {
  heroForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    subtitle: ['', Validators.required],
    color: ['#FFFFFF'],
  });
  @Input()
  hero!: Hero;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly heroService: HeroService
  ) {}

  ngOnInit() {
    this.heroService.getSelectedHero().subscribe((value) => {
      if (value != undefined) {
        this.hero = value;
        this.createForm();
      }
    });
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      name: [this.hero.name || '', Validators.required],
      subtitle: [this.hero.subtitle || '', Validators.required],
      color: [this.rgbToHex(this.hero.color) || '#0000FF'],
    });
  }

  //IMPORTANT: This method is not my own code, I found it on StackOverflow
  //I won't take credit of it, but I will use it to convert the color from rgb to hex
  rgbToHex(rgbString: string) {
    // Extract the integer values for red, green, and blue using a regular expression
    const matches = rgbString.match(
      /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/
    );

    // If the format doesn't match, return null or an error
    if (!matches) {
      console.error('Invalid RGB format');
      return rgbString;
    }

    // Convert each RGB value to a hexadecimal string
    const hexParts = matches.slice(1).map((value) => {
      // Parse the string to an integer
      const intValue = parseInt(value, 10);
      // Convert the integer to a hexadecimal string and pad with leading zero if necessary
      const hexString = intValue.toString(16).padStart(2, '0');
      return hexString;
    });

    // Concatenate the hexadecimal parts together, prefixed with '#'
    return '#' + hexParts.join('');
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const formValues = this.heroForm.value;

      const updatedHero: Hero = {
        id: this.hero.id,
        name: formValues.name,
        subtitle: formValues.description,
        color: formValues.color,
      };

      this.heroService.updateHero(updatedHero);
      this.router.navigateByUrl('main');
    }
  }

  onCancel() {
    this.router.navigateByUrl('main');
  }
}
