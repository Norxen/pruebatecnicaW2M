import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChanged = new EventEmitter<number>();

  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    this.updatePagination();
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.pageChanged.emit(this.currentPage);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updatePagination() {
    //update currentPage to the last page if the current page is greater than the total pages
    if (this.totalPages > 0 && this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
