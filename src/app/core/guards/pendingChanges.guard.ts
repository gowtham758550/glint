import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmationComponent } from "../components/confirmation/confirmation.component";

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable({
    providedIn: 'root'
})
export class pendingChangesGuard implements CanDeactivate<ComponentCanDeactivate>{
    modalRef!: BsModalRef;
    constructor(private modalService: BsModalService) { };
    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
        return component.canDeactivate() ?
            true :
            this.openConfirmDialog();
    }
    openConfirmDialog() {
        this.modalRef = this.modalService.show(ConfirmationComponent);
        return this.modalRef.content.onClose.map((result:any) => {
            return result;
        })
    }



}