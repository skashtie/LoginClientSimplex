import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isTechLink = false;
    token: string;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.loading = true;
        // console.log(' login client ');
        this.isTechLink = true;
        // this.authenticationService.testFunc();
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
              tokenRes => {
                // this.router.navigate([this.returnUrl]);get users list page
                      // console.log('login succ tokenRes = ' + tokenRes);
                      this.token = tokenRes;
                      if (this.token) {
                              // alert(this.token);
                              const link = document.getElementById('technion') as HTMLAnchorElement;
                              link.href = 'https://simplex-smart3d.com/ces/tech/app-auth?token=' + this.token;
                          document.getElementById('technion').click();
                      }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                },
                () => {
                  this.authenticationService.logout();
                }
              );
    }
    adminLogin() {
      // console.log(' adminLogin() works ');
      // this.router.navigate([this.returnUrl]);
      // this.router.navigate(['register']);

      // this.authenticationService.login(this.f.username.value, this.f.password.value)
      // .pipe(first())
      // .subscribe(
      //         // this.router.navigate([this.returnUrl]);
      //         tokenRes => {
      //           console.log('login succ tokenRes = ' + tokenRes);
      //           this.token = tokenRes;
      //           if (this.token) {
      //                   alert(this.token);
      //                   const link = document.getElementById('technion') as HTMLAnchorElement;
      //                   link.href = 'https://simplex-smart3d.com/ces/tech/app-auth?token=' + this.token;
      //               document.getElementById('technion').click();
      //           }
      //     },
      //     error => {
      //         this.alertService.error(error);
      //         this.loading = false;
      //     });
    }
}
