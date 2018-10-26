import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgAddComponent } from './msg-add.component';

describe('ClassAddComponent', () => {
  let component: MsgAddComponent;
  let fixture: ComponentFixture<MsgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
