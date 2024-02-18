import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for form controls
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule for mocking HTTP requests

import { EditViewComponent } from './edit-view.component';

describe('EditViewComponent', () => {
  let component: EditViewComponent;
  let fixture: ComponentFixture<EditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        EditViewComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
