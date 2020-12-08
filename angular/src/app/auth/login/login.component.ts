import { Component, EventEmitter, Inject, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//added:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AlertService, AuthenticationService } from './../../core/_services';
import { DOCUMENT } from '@angular/common';

//declare var jQuery:any;
declare var $: any;
declare const document: Document;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    otpForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    fieldTextType: boolean;

    loginStatus: boolean = true;
    loginOTPStatus: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _loadingBar: SlimLoadingBarService,
        private http: HttpClient,
        private alertService: AlertService) {

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/auth/verify2fa']);
        }
    }

    ngOnInit() {
        this.document.body.className = "hold-transition login-page";

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.otpForm = this.formBuilder.group({
            otp: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    get s() {
        return this.otpForm.controls;
    }


    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this._loadingBar.start();
        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    //   console.log(data)

                    this.alertService.success("Login successfully", true);
                    //  console.log(this.alertService);
                    this.loginStatus = false;
                    this.loginOTPStatus = true;
                    this._loadingBar.complete();
                    //   console.log("dataa")
                    this.router.navigate(['/auth/verify2fa']);
                },
                error => {
                    //  console.log('Login failed:Error');
                    this.alertService.error(error);
                    this._loadingBar.stop();
                    this.loading = false;
                });
    }


    onSubmitOTP() {
        // console.log('otp val:'+this.otpForm.value);
        // stop here if form is invalid
        if (this.otpForm.invalid) {
            return;
        }

        this._loadingBar.start();
        this.loading = true;

        const objForm = {
            email: this.f.email.value,
            otp: this.s.otp
        };

        this.authenticationService.verifyOTP(objForm)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success("OTP hase been sent successfully to your registered mail ID", true);
                    this._loadingBar.complete();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    //  console.log('Login failed:Error');
                    this.alertService.error(error);
                    this._loadingBar.stop();
                    this.loading = false;
                });



        // this.authenticationService.sendOTP(this.s.otp.value)
        // .subscribe(
        //     data => {
        //         console.log('eeeeeeeee'+data);
        //      //this.alertService.success("Login successfully", true);
        //      //this._loadingBar.complete();
        //     // this.router.navigate([this.returnUrl]);    
        //     });


    }

    onSubmitResendOTP() { }
}
