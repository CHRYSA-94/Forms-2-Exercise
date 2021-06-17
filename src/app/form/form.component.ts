import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  CheckedRole;
  testValue = "text for testing";
  moneyList = [
    {value: 54.2523, currencyCode:"EUR"},
    {value: 2.546, currencyCode:"USD"},
    {value: 6, currencyCode:"EUR"},
    {value: 12.568, currencyCode:"EUR"},
    {value: 10, currencyCode:"JPY"},
  ];
  currentCurrency = "EUR"
  myForm: FormGroup;
  formData = new BehaviorSubject<{}>({});
  errorMessages = {
    required : 'This value is required',
    email : 'Not a valid email',
    minlength : 'Password requires at least 8 characters',
    invalidPassword : 'Not valid password',
    differentPassword : 'Please put the same value as that of password ',
    notANumber : 'Please enter numerically value ',
    passwordRequired : 'First put a password value!'
  };

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService ) { }

  ngOnInit(): void {

    this.initializeForm()
    // this.email.valueChanges.pipe(debounceTime(1000)).subscribe(val =>{

    // })

    this.CheckedRole = this.roleService.getRole('maintainer');
  }

  initializeForm() {
    this.myForm = this.fb.group({
      'billingAddress': this.fb.group({
        'firstName':['',Validators.required],
        'lastName': ['',Validators.required],
        'address1': ['',Validators.required],
        'address2': [''],
        'city': ['',Validators.required],
        'state': ['',Validators.required],
        'country': ['',Validators.required],
        'postalCode': ['',Validators.required, Validators.maxLength(5), this.validateIsNumber.bind(this)],
      }),
      'isSameShippingAddress': [false],
      'createAccount':['1'],
      'shippingAddress': this.fb.group({
        'firstName': ['',Validators.required],
        'lastName': ['',Validators.required],
        'address1': ['',Validators.required],
        'address2': [''],
        'city': ['',Validators.required],
        'state': ['',Validators.required],
        'country': ['',Validators.required],
        'postalCode': ['',Validators.required,Validators.maxLength(5), this.validateIsNumber.bind(this)],
      }),
      'accountInfo': this.fb.group({
        'email': ['',{validators:[Validators.required,Validators.email], updateOn:'blur'}],
        'password': ['',{validators:[Validators.required,Validators.minLength(8),this.validPassword], updateOn:'change'}],
        'confirmPassword': ['',{validators:[Validators.required,Validators.minLength(8),this.validConfirmPassword.bind(this)], updateOn:'blur'}]
      }),
      'guestEmail': ['',{validators:[Validators.required,Validators.email], updateOn:'change'}]
    })
  }
  //   this.myForm = new FormGroup({
  //     'billingAddress': new FormGroup({
  //       'firstName': new FormControl(null,[Validators.required]),
  //       'lastName': new FormControl(null,[Validators.required]),
  //       'address1': new FormControl(null,[Validators.required]),
  //       'address2': new FormControl(null),
  //       'city': new FormControl(null,[Validators.required]),
  //       'state': new FormControl(null,[Validators.required]),
  //       'country': new FormControl(null,[Validators.required]),
  //       'postalCode': new FormControl(null,[Validators.required, Validators.maxLength(5), this.validateIsNumber.bind(this)]),
  //     }),
  //     'isSameShippingAddress': new FormControl(false),
  //     'createAccount':new FormControl('1'),
  //     'shippingAddress': new FormGroup({
  //       'firstName': new FormControl(null,[Validators.required]),
  //       'lastName': new FormControl(null,[Validators.required]),
  //       'address1': new FormControl(null,[Validators.required]),
  //       'address2': new FormControl(null),
  //       'city': new FormControl(null,[Validators.required]),
  //       'state': new FormControl(null,[Validators.required]),
  //       'country': new FormControl(null,[Validators.required]),
  //       'postalCode': new FormControl(null,[Validators.required,Validators.maxLength(5), this.validateIsNumber.bind(this)]),
  //     }),
  //     'accountInfo': new FormGroup({
  //       'email': new FormControl(null,{validators:[Validators.required,Validators.email], updateOn:'blur'}),
  //       'password': new FormControl(null,{validators:[Validators.required,Validators.minLength(8),this.validPassword], updateOn:'change'}),
  //       'confirmPassword': new FormControl(null,{validators:[Validators.required,Validators.minLength(8),this.validConfirmPassword.bind(this)], updateOn:'blur'})
  //     }),
  //     'guestEmail': new FormControl(null,{validators:[Validators.required,Validators.email], updateOn:'change'})
  //   })
  // }


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



  // getErrorMessage(controlName) {
  //   const errorList = []

  //   if (controlName.errors) {
  //     Object.keys(controlName.errors).map( error => {
  //       errorList.push(this.errorMessages[error])
  //   })

  //   return errorList
  // }
  // }


  get form() {
    return this.myForm as FormGroup;
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


