import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDashbordComponent } from './advisor-dashbord.component';

describe('AdvisorDashbordComponent', () => {
  let component: AdvisorDashbordComponent;
  let fixture: ComponentFixture<AdvisorDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvisorDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
