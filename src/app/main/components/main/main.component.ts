import { Router, RouterOutlet } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero, HeroSearchResponse } from '../../interfaces/hero';
import { HeroTableComponent } from './hero-table/hero-table.component';
import { SlideToggleComponent } from '../../../shared/components/slide-toggle/slide-toggle.component';
import { HeroCardListComponent } from './hero-card-list/hero-card-list.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { HeroServiceWithApiService } from '../../services/hero-service-with-api/hero-service-with-api.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingBoxComponent } from '../../../shared/components/loading-box/loading-box.component';
import { LoadingService } from '../../services/loading-service/loading.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    RouterOutlet,
    HeroTableComponent,
    SlideToggleComponent,
    HeroCardListComponent,
    SearchBarComponent,
    LoadingBoxComponent,
    CommonModule,
    HttpClientModule,
    PaginationComponent,
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  heroes: Hero[] = [];
  toggleValue: boolean = false;
  //Pagination
  currentPage: number = 1;
  totalRecords: number = 0;
  recordsPerPage: number = 9;
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly heroService: HeroServiceWithApiService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.heroService
          .searchHeroes(this.inputValue, this.currentPage, this.recordsPerPage)
          .subscribe((data) => {
            this.heroes = data.heroes;
            this.totalRecords = data.total;
          });
      });
  }

  onSearch(input: string) {
    this.inputValue = input;

    this.heroService
      .searchHeroes(this.inputValue, this.currentPage, this.recordsPerPage)
      .subscribe((data) => {
        this.heroes = data.heroes;
        this.totalRecords = data.total;
      });
  }

  onToggleChange(checked: boolean) {
    this.toggleValue = checked;
  }

  addNewHero() {
    this.heroService.setSelectedHero({
      id: -1,
      name: '',
      subtitle: '',
      color: '`rgb(0, 0, 0)`',
    });
    this.router.navigate(['edit-hero']);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.heroService
      .searchHeroes(this.inputValue, this.currentPage, this.recordsPerPage)
      .subscribe((data) => {
        this.heroes = data.heroes;
        this.totalRecords = data.total;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
