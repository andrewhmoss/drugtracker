import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Subscription} from "rxjs";
import { SessionService } from '../../services/session'
import { DosageService } from '../../services/dosage'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnDestroy {

  public drugName: string;
  public drugHistory;
  public canTake: boolean;
  public nextDose: number;

  private sessionSub: Subscription;
  private dosageSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private session: SessionService,
    private dosage: DosageService
  ) {
    this.sessionSub = session.getObservableData().subscribe(
      (data: any) => {
        this.drugName = data.drugName;
        this.drugHistory = data.drugHistory;
      }
    );
    this.dosageSub = dosage.getObservableData().subscribe(
      (data: any) => {
        this.canTake = data.canTake;
        this.nextDose = data.nextDose;
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
    if (this.dosageSub) {
      this.dosageSub.unsubscribe();
    }
  }

  public onDrugTaken(): void {
    this.session.addDrugEvent(Date.now());
  }

  public onClearHistory(): void {
    this.session.reset();
  }
}
