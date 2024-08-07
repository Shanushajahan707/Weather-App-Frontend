import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode: boolean = true;
  error: string | null = null;
  isLoggedIn: boolean = false;


  constructor(private fb: FormBuilder, private accountService: AccountService, private _router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }
  ngOnInit(): void {
    this.accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    // Check if the user is already logged in
    this.isLoggedIn = !!localStorage.getItem('token');
    if (this.isLoggedIn) {
      this.accountService.setLoggedIn(true);
    }
  }

  showLoginForm(): void {
    this.isLoginMode = true;
    this.error = null;
  }

  showRegisterForm(): void {
    this.isLoginMode = false;
    this.error = null;
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.accountService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token); 
          this.accountService.setHeaderTitle('Home');
          this.accountService.setLoggedIn(true); 
          alert(response.message);
          this.loginForm.reset();
          this._router.navigate(['/home'])
        },
        error: (err) => {
          console.error('Login error', err);
          alert(err.error.message);
          this.error = err.error.message;
        },
      });
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }
  

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.accountService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert(response.message);
          this.registerForm.reset();
          this.showLoginForm();  // Switch to login form after successful registration
        },
        error: (err) => {
          console.error('Registration error', err);
          this.error = err.error.message;
        },
      });
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}