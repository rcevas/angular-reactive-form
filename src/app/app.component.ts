import { Component, OnInit } from '@angular/core';
/* import { FormGroup, FormControl } from '@angular/forms'; */
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateCity() {
    return this.registrationForm.get('alternateCity') as FormArray;
  }

  addAlternateCity() {
    this.alternateCity.push(this.fb.control(''));
  }

   constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

   ngOnInit() {
      this.registrationForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postcode: ['']
        }),
        alternateCity: this.fb.array([]),
      }, {validator: passwordValidator});

      this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if(checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
   }

  

 /*  Registration form using formGroup and formControl
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postcode: new FormControl('')
    })
  })*/

  loadApiData() {
    this.registrationForm.patchValue({
      username: 'Rodrigo',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'Barcelona',
        state: 'Spain',
        postcode: '12345'
      }
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
    .subscribe(
      response => console.log('success!', Response),
      error => console.error('error!', error)
    );
  }
}
