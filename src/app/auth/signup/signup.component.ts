import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signUpGroup: FormGroup;
  passwordGroup: FormGroup

  constructor(private fb: FormBuilder) {

    this.passwordGroup = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.passwordMatcher});

    this.signUpGroup = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern("/^[a-zA-Z0-9]+$/")
      ]],
      fullname: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$")
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordGroup: this.passwordGroup
    });
  }


  ngOnInit(): void {
  }

  passwordMatcher(fg: FormGroup): { [key: string]: boolean } | null {
    const pass = fg.get('password')?.value;
    const confirmPass = fg.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordMatch: true };
  }

}
