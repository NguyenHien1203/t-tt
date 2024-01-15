import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visable: BehaviorSubject<boolean> = new BehaviorSubject(false);
public readonly loader$ = this.visable.asObservable();

  constructor() {
    // this.visable = new BehaviorSubject(false);
  }

  show() {
    this.visable.next(true);
  }

  hide() {
    this.visable.next(false);
  }
}
