import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { SessionService } from '../services/session.service';
import { DosageService } from '../services/dosage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public canTake: boolean;
  public nextDose: number;
  private dosageSub: Subscription;

  constructor(
    dosage: DosageService,
    private session: SessionService
  ) {
    this.dosageSub = dosage.getObservableData().subscribe(
      (data: any) => {
        this.canTake = data.canTake;
        this.nextDose = data.nextDose;
      }
    );
  }

  ngOnInit() { }

  public ngOnDestroy(): void {
    if (this.dosageSub) {
      this.dosageSub.unsubscribe();
    }
  }

  public onDrugTaken(): void {
    this.session.addDrugEvent(Date.now());
  }

}
