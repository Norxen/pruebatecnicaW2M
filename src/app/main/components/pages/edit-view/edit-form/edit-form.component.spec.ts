import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EditFormComponent } from './edit-form.component';
import { HeroService } from '../../../../services/hero-service/hero-service.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Prepare a mock HeroService
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'getSelectedHero',
      'updateHero',
    ]);

    // Mock Router
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        EditFormComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;

    // Mock getSelectedHero return value
    mockHeroService.getSelectedHero.and.returnValue(
      of({
        id: 1,
        name: 'Hero Name',
        subtitle: 'Hero Subtitle',
        color: 'rgb(255, 0, 0)',
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
