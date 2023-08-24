// shared.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
  showModal: EventEmitter<void> = new EventEmitter<void>();

  triggerModal(): void {
    this.showModal.emit();
  }
}