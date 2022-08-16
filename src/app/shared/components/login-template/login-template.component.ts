import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouteConstants } from 'src/app/data/enums/constatnts/route.constants';
import { Role } from 'src/app/data/enums/role.enum';
import { FormField } from 'src/app/data/models/form-field.model';
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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.role);
    if (this.role = Role.jobSeeker) {
      this.signupRoute = this.routeConstants.jobSeekerSignup;
    } else if (this.role = Role.employer) {
      this.signupRoute = this.routeConstants.employerSignup;
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: data => {
        this.toastr.success('Logged in successfully');
        const dataObject = JSON.parse(JSON.stringify(data));
        this.localStorage.setItem('accessToken', dataObject.jwt);
        const role = this.authService.getRole();
        if (role == 'JobSeeker') this.router.navigateByUrl(this.routeConstants.jobSeekerHome);
        else if (role == 'Employer') this.router.navigateByUrl(this.routeConstants.employerDashboard);
      }
    });
  }

}
