import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  update = false;
  loaded = false;
  user!: any;
  updateUser!: any;
  profilForm!: FormGroup;
  usernameCheck: any = true;
  emailCheck: any = true;
  emailVacant: any = true;

  constructor(private formBuilder: FormBuilder, private customValidator: CustomvalidationService, private userService : UsersService) {}

  ngOnInit(): void {
        //User 10 par default à changer
        this.userService.getUserFromService(10).subscribe(data => {
          this.user = data;

          //Permet de lancer qu'une fois la requête finie
          this.initForm();

          //le html ne se charge pas tant que loaded = false
          //laisse le temps à la requête http de se faire
          this.loaded = true;
        });

  }

  initForm(){
    this.profilForm = this.formBuilder.group({
      //username: [this.user.username, [Validators.required, this.customValidator.usernameValidator.bind(this.customValidator, this.user.username)]],
      username: [this.user.username, [Validators.required]],
      idCompany: [this.user.idCompany],
      lastName: [this.user.lastName, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      emailVerified: ['']
    }, {
      updateOn: 'blur',
    })

    this.checkUsername();
    this.checkEmail();
    this.checkConfirmEmail();

    //Form bloqué tant que le bouton "modifier mon profil" n'est pas cliqué
    this.profilForm.disable();
  }

  checkUsername(){
    this.profilForm.get('username')?.valueChanges.subscribe(value => {
      let formUsername: String = this.profilForm.get('username')?.value;
      
      //true si modification par l'user
      if(this.profilForm.get('username')?.dirty){
        console.log("inside");

        //Ne compare que si l'input est différent de l'Username actuel de l'user
        if(this.user.username != formUsername){
          this.userService.checkUsernameService(formUsername).subscribe(data => {
            this.usernameCheck = data;
            //si False, bouton désactivé (html)
          })
        } else {
          console.log('username identique');
          this.usernameCheck = true;
        }
      }

      
    })
  }

  checkEmail(){
    this.profilForm.get('email')?.valueChanges.subscribe(value => {
      let formEmail: String = this.profilForm.get('email')?.value;
      let formEmailConfirm: String = this.profilForm.get('emailVerified')?.value;
      
      //Ne compare que si l'input est différent de l'email actuel de l'user
      if(this.user.email != formEmail){
        this.emailCheck = false;
        this.profilForm.controls["emailVerified"].setValidators(Validators.required);
        this.userService.checkEmailService(formEmail).subscribe(data => {
             this.emailVacant = data;
        })
      } else {
        this.emailCheck = true;
        this.profilForm.controls["emailVerified"].clearValidators();
        console.log('email identique');
      }
      
    })
  }

  checkConfirmEmail(){
    this.profilForm.get('emailVerified')?.valueChanges.subscribe(value => {
      let formEmail: String = this.profilForm.get('email')?.value;
      let formEmailConfirm: String = this.profilForm.get('emailVerified')?.value;

      console.log(formEmail);
      console.log(formEmailConfirm);

      if(formEmail == formEmailConfirm){
        this.emailCheck = true;
      }

    })
    
  }

  onUpdateForm(){
    this.update = true;
    this.profilForm.enable();
    
    this.profilForm.get('idCompany')?.disable();//garde IdCompany bloqué

  }

  onSubmitForm(){
    this.updateUserDto();

    console.log("dans submit");
    this.userService.updateProfilService(this.user).subscribe(()=>{
      console.log("requête envoyée !");
    });

    this.update = false;
    this.profilForm.disable();
  }

  updateUserDto(){
    this.updateUser = this.profilForm.value;

    this.user.username = this.updateUser.username;
    this.user.lastName = this.updateUser.lastName;
    this.user.firstName = this.updateUser.firstName;
    this.user.email = this.updateUser.email;
  }

}
