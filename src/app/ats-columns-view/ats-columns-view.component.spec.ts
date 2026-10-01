import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsColumnsViewComponent } from './ats-columns-view.component';

describe('AtsColumnsViewComponent', () => {
  let component: AtsColumnsViewComponent;
  let fixture: ComponentFixture<AtsColumnsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsColumnsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsColumnsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
