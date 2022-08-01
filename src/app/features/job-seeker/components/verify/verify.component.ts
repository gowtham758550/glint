import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: [`

    :host ::ng-deep .p-message {
          margin-left: .25em;
        }

    :host ::ng-deep .p-toast{
        z-index:99999;
    }
  `],
  providers: [MessageService]
})
export class VerifyComponent implements OnInit {

  isVerified = false;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  next() {
    if (this.isVerified) {
      this.router.navigateByUrl('/job-seeker/signup/personal-information');
    } else {
      console.log(false);
      this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }
  }

}
