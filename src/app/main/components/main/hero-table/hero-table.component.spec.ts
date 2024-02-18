import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTableComponent } from './hero-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroTableComponent', () => {
  let component: HeroTableComponent;
  let fixture: ComponentFixture<HeroTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTableComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
