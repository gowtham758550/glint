import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Role } from 'src/app/data/enums/role.enum';
import { AuthService } from 'src/app/data/services/auth.service';
import { LocalStorage } from 'src/app/data/services/local-storage.service';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styles: [
  ]
})
export class LoginTemplateComponent implements OnInit {

  @Input()
  role!: Role;

  signupRoute!: string;
  routeConstants = RouteConstants;
  loginForm: FormGroup = this.formBuilder.group({
    userName_or_Email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorage,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (this.role = Role.jobSeeker) {
      this.signupRoute = this.routeConstants.jobSeekerSignup;
    } else if (this.role = Role.employer) {
      this.signupRoute = this.routeConstants.employerSignup;
    }
  }

  login() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe({
      next: data => {
        this.toastr.success('Logged in successfully');
        const dataObject = JSON.parse(JSON.stringify(data));
        this.localStorage.setItem('accessToken', dataObject.jwt);
        const role = this.authService.getRole();
        this.spinner.hide()
        if (role == 'JobSeeker') this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
        else if (role == 'Employer') this.router.navigateByUrl(this.routeConstants.employerDashboard);
      },
      error: () => {
        this.loginForm.patchValue({
          password: ''
        });
      }
    });
  }

}
