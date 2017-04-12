import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {SessionService} from './session'

@Injectable()
export class DosageService {

  private data = {
    canTake: false,
    nextDose: 0
  }
  private dataSubject: BehaviorSubject<any>;

  private hourInMs = 3600000;

  constructor(private session: SessionService) {
    this.dataSubject = new BehaviorSubject<any>(this.data);
    session.getObservableData().subscribe(
      (data: any) => this.onDrugUpdate(data)
      );
  }

  public onDrugUpdate(data: any): void {
    const now = Date.now();
    if (!data.drugHistory || data.drugHistory.length < 1) {
      this.data.canTake = true;
      this.data.nextDose = now;
    } else {
       const lastDose = data.drugHistory[data.drugHistory.length-1];
       const sinceLastDose = now - lastDose;
       if (sinceLastDose > this.hourInMs * 4) {
         this.data.canTake = true;
         this.data.nextDose = now;
       } else {
         this.data.canTake = false;
         this.data.nextDose = lastDose + this.hourInMs * 4;
       }
    }
    if (data.drugHistory.length >= 4) {
      const twentyFourHrs = this.hourInMs * 24;
      const oldDose = data.drugHistory[data.drugHistory.length-4];
      if (now - oldDose < twentyFourHrs) {
        this.data.canTake = false;
        this.data.nextDose = Math.max(this.data.nextDose, oldDose + twentyFourHrs);
      }
    }

    this.dataSubject.next(this.data);
  }

  public getObservableData(): Observable<any> {
    return this.dataSubject.asObservable();
  }
}
