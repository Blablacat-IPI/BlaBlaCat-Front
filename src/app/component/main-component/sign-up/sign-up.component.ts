import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRegister: boolean = false

  signUpForm!: FormGroup;

  usernameCheck: any = true;
  companyIdCheck: any = true;
  passwordRegExCheck = true;
  passwordConfirm = true;
  emailRegExCheck = true;
  emailVacant: any = true;
  emailConfirm = true;
  allValid = false;

  regExEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w{1,3}]{2,3}$/; // xxxxxxxxxxxx@XXXXXXXX.XX(XX)
  regExPassword: RegExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;//8 caractères minimum, 1 maj, 1 min, 1 chiffre, 1 caractère speciale

  constructor(private us: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initSubscribes();
  }

  initForm() {

    this.signUpForm = this.formBuilder.group({
      username: [, [Validators.required]],
      idCompany: [, [Validators.required]],
      lastName: [, [Validators.required]],
      firstName: [, [Validators.required]],
      email: [, [Validators.required, Validators.pattern(this.regExEmail)]],
      emailVerified: [, [Validators.required]],
      password: [, [Validators.required, Validators.pattern(this.regExPassword)]],
      passwordVerified: [, [Validators.required]]
    }, {
      updateOn: 'blur',
    });

  }

  initSubscribes(){
    this.signUpForm.get('username')?.valueChanges.subscribe(value => {
      this.checkUsername(value);
    })

    this.signUpForm.get('idCompany')?.valueChanges.subscribe(value => {
      this.checkCompanyId(value);
    })
    this.signUpForm.get('email')?.valueChanges.subscribe(value => {
      this.checkEmail(value);
    })

    this.signUpForm.get('emailVerified')?.valueChanges.subscribe(value => {
      this.checkEmailConfirmed();
    });

    this.signUpForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPassword(value);
    })

    this.signUpForm.get('passwordVerified')?.valueChanges.subscribe(value => {
      this.checkPasswordConfirmed();
    });

    this.signUpForm.valueChanges.subscribe(value => {
      this.checkAllValid();
    })
  }

  checkUsername(value: string) {
    this.us.checkUsernameService(value).subscribe(data => {
      this.usernameCheck = data;
    });
  }

  checkCompanyId(value: string) {
    this.us.checkCompanyIdService(value).subscribe(data => {
      this.companyIdCheck = data;
    });
  }

  checkEmail(value: string) {
    if (this.regExEmail.test(value)) {
      this.emailRegExCheck = true;
      this.us.checkEmailService(value).subscribe(data => {
        this.emailVacant = data;
      })
    } else {
      this.emailRegExCheck = false;
    }

    if (this.emailVacant) {
      if (this.signUpForm.get('emailVerified')?.dirty) {
        this.checkEmailConfirmed();
      }
    }
  }

  checkEmailConfirmed() {

    if (this.signUpForm.get('emailVerified')?.value == this.signUpForm.get('email')?.value) {
      this.emailConfirm = true;
    } else {
      this.emailConfirm = false;
    }

  }

  checkPassword(value: string) {
    if (this.regExPassword.test(value)) {
      this.passwordRegExCheck = true;
      if (this.signUpForm.get('passwordVerified')?.dirty) {
        this.checkPasswordConfirmed();
      }
    } else {
      this.passwordRegExCheck = false;
    }
  }

  checkPasswordConfirmed() {
    if (this.signUpForm.get('passwordVerified')?.value == this.signUpForm.get('password')?.value) {
      this.passwordConfirm = true;
    } else {
      this.passwordConfirm = false;
    }
  }

  checkAllValid() {

    if (this.usernameCheck && this.companyIdCheck && this.passwordConfirm && this.emailConfirm) {
      this.allValid = true;
    } else {
      this.allValid = false;
      console.log(this.usernameCheck)
      console.log(this.companyIdCheck)
      console.log(this.passwordConfirm)
      console.log(this.emailConfirm)
    }
  }

  onSubmitForm() {
    console.log(this.signUpForm.value);

    this.us.addUsersFromService(this.signUpForm.value).subscribe(data => {
      console.log('User enregistré');
      this.userRegister = true;
      setTimeout(() => {
        this.userRegister = false;
      }, 2000);
    })
  }


  // addUsers(user: any) {
  //   console.log(user.value)
  //   this.us.addUsersFromService(user.value).subscribe(data => {
  //     console.log('Users Enregistré');
  //     this.userRegister = true;
  //     setTimeout(() => {
  //       this.userRegister = false;
  //     }, 2000);
  //   })
  // }

}
