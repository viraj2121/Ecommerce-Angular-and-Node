import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassChangeService {
  private classChangeSubject = new Subject<string>();
  classChange$ = this.classChangeSubject.asObservable();

  updateClass(className: string) {
    this.classChangeSubject.next(className);
  }
}