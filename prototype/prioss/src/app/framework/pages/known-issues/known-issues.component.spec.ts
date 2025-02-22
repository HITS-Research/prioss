import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownIssuesComponent } from './known-issues.component';

describe('KnownIssuesComponent', () => {
  let component: KnownIssuesComponent;
  let fixture: ComponentFixture<KnownIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnownIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnownIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
