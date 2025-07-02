import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsViewComponent } from './ats-view.component';

describe('AtsViewComponent', () => {
  let component: AtsViewComponent;
  let fixture: ComponentFixture<AtsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
