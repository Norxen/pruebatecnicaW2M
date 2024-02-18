import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading-box',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './loading-box.component.html',
  styleUrl: './loading-box.component.scss',
})
export class LoadingBoxComponent {
  constructor() {}
}
