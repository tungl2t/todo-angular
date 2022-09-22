import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy {
  unSubscribeOnDestroy: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.unSubscribeOnDestroy.next(true);
    this.unSubscribeOnDestroy.complete();
  }
}
