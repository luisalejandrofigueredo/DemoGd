import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCandelChartsComponent } from './demo-candel-charts.component';

describe('DemoCandelChartsComponent', () => {
  let component: DemoCandelChartsComponent;
  let fixture: ComponentFixture<DemoCandelChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoCandelChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoCandelChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
