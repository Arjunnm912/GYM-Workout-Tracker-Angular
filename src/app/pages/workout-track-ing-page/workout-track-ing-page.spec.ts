import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTrackIngPage } from './workout-track-ing-page';

describe('WorkoutTrackIngPage', () => {
  let component: WorkoutTrackIngPage;
  let fixture: ComponentFixture<WorkoutTrackIngPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTrackIngPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTrackIngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
