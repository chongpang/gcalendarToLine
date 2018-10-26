import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgListComponent } from './msg-list.component';

describe('ClassListComponent', () => {
  let component: MsgListComponent;
  let fixture: ComponentFixture<MsgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
