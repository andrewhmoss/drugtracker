import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from "rxjs";

const STORAGE_KEY = 'drugtracker_drugSession';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private data = {
    drugName: "Paracetemol",
    drugHistory: []
  }
  private dataSubject: BehaviorSubject<any>;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.dataSubject = new BehaviorSubject<any>(this.data);

    // Load from local storage
    var data = this.storage.get(STORAGE_KEY);
    if (data) {
      this.data = JSON.parse(data);
      this.dataSubject.next(this.data);
    }
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
    this.storage.set(STORAGE_KEY, JSON.stringify(this.data));
  }
}
