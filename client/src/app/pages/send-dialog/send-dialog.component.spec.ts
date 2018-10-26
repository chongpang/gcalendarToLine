import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDialogComponentDialog } from './send-dialog.component';

describe('SendDialogComponent', () => {
  let component: SendDialogComponentDialog;
  let fixture: ComponentFixture<SendDialogComponentDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDialogComponentDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDialogComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
