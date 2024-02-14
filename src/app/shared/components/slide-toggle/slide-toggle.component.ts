import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SlideToggleComponent {
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  onChange($event: MatSlideToggleChange) {
    this.checkedChange.emit($event.checked);
  }
}
