import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SessionService {

  private data = {
    drugName: "Paracetemol",
    drugHistory: []
  }
  private dataSubject: BehaviorSubject<any>;

  constructor(private storage: Storage) {
    this.dataSubject = new BehaviorSubject<any>(this.data);

    // Load from local storage
    storage.ready().then(() => {
       storage.get('drugSession').then(
         (data) => {
           if (data != null) {
             this.data = JSON.parse(data);
             this.dataSubject.next(this.data);
           }
         });
     });
  }

  public getData(): any {
    return this.data;
  }

  public getObservableData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  public addDrugEvent(time: number): void {
    this.data.drugHistory.push(time);
    this.saveData();
    this.dataSubject.next(this.data);
  }

  public reset(): void {
    this.data.drugHistory = [];
    this.saveData();
    this.dataSubject.next(this.data);
  }

  private saveData(): void {
    this.storage.ready().then(() => {
       this.storage.set('drugSession', JSON.stringify(this.data));
     });
  }
}
