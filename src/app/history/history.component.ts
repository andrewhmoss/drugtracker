import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {

  public drugHistory: any;
  public drugName: string;
  private sessionSub: Subscription;

  constructor(session: SessionService) {
    this.sessionSub = session.getObservableData().subscribe(
      (data: any) => {
        this.drugHistory = data.drugHistory;
        this.drugName = data.drugName;
      }
    );
  }

  ngOnInit() { }

  public ngOnDestroy(): void {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
  }

}
