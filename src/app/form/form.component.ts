import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  formData = new BehaviorSubject<{}>({});
  constructor() { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'billingAddress': new FormGroup({
        'firstName': new FormControl(null,[Validators.required]),
        'lastName': new FormControl(null,[Validators.required]),
        'address1': new FormControl(null,[Validators.required]),
        'address2': new FormControl(null),
        'city': new FormControl(null,[Validators.required]),
        'state': new FormControl(null,[Validators.required]),
        'country': new FormControl(null,[Validators.required]),
        'postalCode': new FormControl(null,[Validators.required, Validators.maxLength(5), this.validateIsNumber.bind(this)]),
      }),
      'isSameShippingAddress': new FormControl(false),
      'createAccount':new FormControl('1'),
      'shippingAddress': new FormGroup({
        'firstName': new FormControl(null,[Validators.required]),
        'lastName': new FormControl(null,[Validators.required]),
        'address1': new FormControl(null,[Validators.required]),
        'address2': new FormControl(null),
        'city': new FormControl(null,[Validators.required]),
        'state': new FormControl(null,[Validators.required]),
        'country': new FormControl(null,[Validators.required]),
        'postalCode': new FormControl(null,[Validators.required,Validators.maxLength(5), this.validateIsNumber.bind(this)]),
      }),
      'accountInfo': new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required,Validators.minLength(8),this.validPassword]),
        'confirmPassword': new FormControl(null,[Validators.required,Validators.minLength(8),this.validConfirmPassword.bind(this)])
      }),
      'guestEmail': new FormControl(null,[Validators.required,Validators.email])
    })


  }

  onSubmit() {

    if(this.isSameShippingAddress.value) {
      this.myForm.patchValue({
        'shippingAddress': ({
          'firstName': this.billingFirstName.value,
          'lastName': this.billingLastName.value,
          'address1': this.billingAddress1.value,
          'address2': this.billingAddress2.value,
          'city': this.billingCity.value,
          'state': this.billingState.value,
          'country': this.billingCountry.value,
          'postalCode': this.billingPostalCode.value,
        })
      })
    }

    this.formData.next(this.myForm)
    this.formData.subscribe(data => console.log("form data",data))
  }

  onReset() {
    this.myForm.reset();
    console.log(this.myForm)
  }


  validPassword(control: FormControl): {[key: string]: boolean} | null{
    const specialCharacters = '(@$!%*£?&)'.split("");
    if(control.value) {
      const userValue = control.value.split("");

      const upperCase = userValue.some(char =>  char === char.toUpperCase() )
      const lowerCase = userValue.some(char =>  char === char.toLowerCase() )
      const numbers = userValue.some(char =>  !isNaN(char))
      const sCharacters = userValue.some(char =>  specialCharacters.includes(char) )

      return (upperCase && lowerCase && numbers && sCharacters)?  null : {'invalidPassword' : true}
    }
  }


  validConfirmPassword(control : FormControl): {[key: string]: boolean} | null {
    if(control.value && this.password.value) {
      return control.value === this.password.value? null : {'differentPassword' : true} ;
    } else {
      return {'passwordRequired' : true}
    }
  }

  validateIsNumber(control : FormControl): {[key: string]: boolean} | null {
    if(control.value) {
      return isNaN(control.value) ? {'notANumber': true} : null
    }
  }



  getErrorMessage(controlName) {
    if (controlName.hasError('required')) {
      return 'This value is required';
    } else if (controlName.hasError('email')) {
      return 'Not a valid email'
    } else if (controlName.hasError('minlength') ) {
      return 'Password requires at least 8 characters'
    } else if (controlName.hasError('invalidPassword') ) {
      return 'Not valid password'
    } else if (controlName.hasError('differentPassword') ) {
      return 'Please put the same value as that of password '
    } else if (controlName.hasError('notANumber') ) {
      return 'Please enter numerically value '
    } else {
      return ''
    }
  }


  get billingAddress() {
    return this.myForm.get('billingAddress') as FormGroup;
  }
  get billingFirstName() {
    return this.myForm.get('billingAddress.firstName') as FormControl;
  }
  get billingLastName() {
    return this.myForm.get('billingAddress.lastName') as FormControl;
  }
  get billingAddress1() {
    return this.myForm.get('billingAddress.address1') as FormControl;
  }
  get billingAddress2() {
    return this.myForm.get('billingAddress.address2') as FormControl;
  }
  get billingCity() {
    return this.myForm.get('billingAddress.city') as FormControl;
  }
  get billingState() {
    return this.myForm.get('billingAddress.state') as FormControl;
  }
  get billingCountry() {
    return this.myForm.get('billingAddress.country') as FormControl;
  }
  get billingPostalCode() {
    return this.myForm.get('billingAddress.postalCode') as FormControl;
  }

  get isSameShippingAddress() {
    return this.myForm.get('isSameShippingAddress') as FormControl;
  }
  get createAccount() {
    return this.myForm.get('createAccount') as FormControl;
  }

  get shippingAddress() {
    return this.myForm.get('shippingAddress') as FormGroup;
  }
  get shippingFirstName() {
    return this.myForm.get('shippingAddress.firstName') as FormControl;
  }
  get shippingLastName() {
    return this.myForm.get('shippingAddress.lastName') as FormControl;
  }
  get shippingAddress1() {
    return this.myForm.get('shippingAddress.address1') as FormControl;
  }
  get shippingAddress2() {
    return this.myForm.get('shippingAddress.address2') as FormControl;
  }
  get shippingCity() {
    return this.myForm.get('shippingAddress.city') as FormControl;
  }
  get shippingState() {
    return this.myForm.get('shippingAddress.state') as FormControl;
  }
  get shippingCountry() {
    return this.myForm.get('shippingAddress.country') as FormControl;
  }
  get shippingPostalCode() {
    return this.myForm.get('shippingAddress.postalCode') as FormControl;
  }

  get accountInfo() {
    return this.myForm.get('accountInfo') as FormGroup;
  }
  get email() {
    return this.myForm.get('accountInfo.email') as FormControl;
  }
  get password() {
    return this.myForm.get('accountInfo.password') as FormControl;
  }
  get confirmPassword() {
    return this.myForm.get('accountInfo.confirmPassword') as FormControl;
  }
  get guestEmail() {
    return this.myForm.get('guestEmail') as FormControl;
  }



}
