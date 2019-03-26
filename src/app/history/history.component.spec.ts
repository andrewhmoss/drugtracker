import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSidenavModule, MatToolbarModule, MatListModule,
  MatIconModule, MatCardModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatCardModule,
        MatListModule
      ],
      declarations: [HistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
