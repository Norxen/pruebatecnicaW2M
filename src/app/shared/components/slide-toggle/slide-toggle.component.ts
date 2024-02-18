import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SlideToggleComponent {
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isToggled: boolean = false;
  //Variable icon set to value of material icon window
  icon: string = 'grid_view';

  constructor() {}

  onChange() {
    this.isToggled = !this.isToggled;
    this.icon = !this.isToggled ? 'grid_view' : 'view_list';
    this.checkedChange.emit(this.isToggled);
  }
}
