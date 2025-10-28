import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datepickerdesign } from './datepickerdesign';

describe('Datepickerdesign', () => {
  let component: Datepickerdesign;
  let fixture: ComponentFixture<Datepickerdesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datepickerdesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datepickerdesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
