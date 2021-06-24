import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyItemComponent } from './agency-item.component';

describe('AgencyItemComponent', () => {
  let component: AgencyItemComponent;
  let fixture: ComponentFixture<AgencyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
