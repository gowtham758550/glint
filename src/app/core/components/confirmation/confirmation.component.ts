import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.component.html',
  styles: [
  ]
})
export class ConfirmationComponent implements OnInit {

  public onClose!: Subject<boolean>;

    constructor(private _bsModalRef: BsModalRef) {

    }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public onConfirm(): void {
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(false);
        this._bsModalRef.hide();
    }
}
