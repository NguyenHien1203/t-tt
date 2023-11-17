import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabCloseService {
  private tabClosedSource = new Subject<void>();
  tabClosed$ = this.tabClosedSource.asObservable();

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any): void {
    this.tabClosedSource.next();
  }
}