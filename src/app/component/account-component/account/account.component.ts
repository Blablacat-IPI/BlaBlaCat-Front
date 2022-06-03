import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  cookieUserId: any;

  update = false;
  loaded = false;

  user!: any;
  updateUser!: any;
  profilForm!: FormGroup;

  allValid: any = true;
  usernameCheck: any = true;
  emailCheck: any = true;
  emailError: any = false;
  emailVacant: any = true;
  passwordCheck: any = true;
  passwordError: any = false;
  passwordConfirm: any = true;
  confirmError: any = false;

  regExEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w{1,3}]{2,3}$/; // xxxxxxxxxxxx@XXXXXXXX.XX(XX)
  //8 caractères minimum, 1 maj, 1 min, 1 chiffre, 1 caractère speciale
  regExPassword: RegExp = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

  constructor(private formBuilder: FormBuilder, private customValidator: CustomvalidationService, private userService: UsersService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieUserId = this.cookieService.get('CookieCatId');

    this.userService.getUserFromService(this.cookieUserId).subscribe(data => {
      this.user = data;

      //Permet de lancer qu'une fois la requête finie
      this.initForm();

      //le html ne se charge pas tant que loaded = false
      //laisse le temps à la requête http de se faire
      this.loaded = true;

      //Form bloqué tant que le bouton "modifier mon profil" n'est pas cliqué
      this.profilForm.disable();
    });

  }

  initForm() {
    this.profilForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      idCompany: [this.user.idCompany],
      lastName: [this.user.lastName, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(this.regExEmail)]],
      emailVerified: [],
      password: [],
      passwordVerified: []
    }, {
      updateOn: 'blur',
    })

    this.checkUsername();
    this.checkEmail();
    this.checkConfirmEmail();
    this.checkPassword();
    this.checkConfirmPassword();
  }

  checkUsername() {
    this.profilForm.get('username')?.valueChanges.subscribe(value => {
      let formUsername: String = this.profilForm.get('username')?.value;

      //true si modification par l'user
      if (this.profilForm.get('username')?.dirty) {

        //Ne compare que si l'input est différent de l'Username actuel de l'user
        if (this.user.username != formUsername) {
          this.userService.checkUsernameService(formUsername).subscribe(data => {
            this.usernameCheck = data;
            //si False, bouton désactivé (html)
          })
        } else {
          this.usernameCheck = true;
        }

        this.checkAllValid();
      }

    })
  }

  checkEmail() {
    this.profilForm.get('email')?.valueChanges.subscribe(value => {
      let formEmail: string = this.profilForm.get('email')?.value;

      //Si User modifie
      if (this.profilForm.get('email')?.dirty) {

        //Ne compare que si l'input est différent de l'email actuel de l'user
        if (this.user.email != formEmail) {

          if (this.regExEmail.test(formEmail)) {
            this.emailError = false;
            this.emailCheck = false;
            this.userService.checkEmailService(formEmail).subscribe(data => {
              this.emailVacant = data;
            })
          } else {
            this.emailError = true;
          }



        } else {
          this.emailError = false;
          this.emailCheck = true;
          this.profilForm.get('emailVerified')?.markAsPristine();
        }
        this.checkAllValid();
      }
    })
  }

  checkConfirmEmail() {

    this.profilForm.get('emailVerified')?.valueChanges.subscribe(value => {
      let formEmail: String = this.profilForm.get('email')?.value;
      let formEmailConfirm: String = this.profilForm.get('emailVerified')?.value;

      if (formEmail == formEmailConfirm) {
        this.emailCheck = true;
      }

      this.checkAllValid();
    })
  }

  checkPassword() {
    this.profilForm.get('password')?.valueChanges.subscribe(value => {
      let formPassword: string = this.profilForm.get('password')?.value;

      if (null == formPassword) {
        this.passwordCheck = true;
        this.passwordConfirm = true;

      } else if ("" == formPassword) {
        this.profilForm.get('password')?.markAsPristine();
        this.profilForm.get('password')?.setValue(null);
      }

      //true si modification par l'user
      if (this.profilForm.get('password')?.dirty) {

        if (this.user.password != formPassword) {
          this.passwordCheck = false;

          if (this.regExPassword.test(formPassword)) {
            this.passwordError = false;
            this.passwordConfirm = false;
          } else {
            this.passwordError = true;
          }
        } else {
          this.passwordCheck = true;
        }
      }
      this.checkAllValid();
    })
  }

  checkConfirmPassword() {
    this.profilForm.get('passwordVerified')?.valueChanges.subscribe(data => {

      let password: String = this.profilForm.get('password')?.value;
      let confirmPassword: String = this.profilForm.get('passwordVerified')?.value;

      if (confirmPassword == password) {
        this.confirmError = false;
        this.passwordConfirm = true;
        this.passwordCheck = true;
      } else {
        this.confirmError = true;
      }
      this.checkAllValid();
    })
  }

  checkAllValid() {

    if (!this.emailCheck || !this.usernameCheck || !this.passwordCheck) {
      this.allValid = false;
    } else {
      this.allValid = true;
    }
  }

  onUpdateForm() {
    this.update = true;
    this.profilForm.enable();

    this.profilForm.get('idCompany')?.disable();//garde IdCompany bloqué
  }

  onSubmitForm() {
    this.updateUserDto();
    this.userService.updateProfilService(this.user).subscribe(() => {
      console.log("requête envoyée !");
    });

    this.update = false;
    this.profilForm.disable();
  }

  updateUserDto() {
    this.updateUser = this.profilForm.value;

    this.user.username = this.updateUser.username;
    this.user.lastName = this.updateUser.lastName;
    this.user.firstName = this.updateUser.firstName;
    this.user.email = this.updateUser.email;

    if (null != this.updateUser.password) {
      this.user.password = this.updateUser.password;
    }
  }

}
