import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageHeader } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: ComponentPageHeader;
  let fixture: ComponentFixture<ComponentPageHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPageHeader ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
