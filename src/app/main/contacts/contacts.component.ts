import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.mobile.scss']
})
export class ContactsComponent implements OnInit {

  public myForm: FormGroup;
  public formattedMessage: string;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      message: ['', Validators.required]
    });

    this.myForm.get('name').statusChanges.subscribe(name => {
      console.log(name);
    })

  }

  onSubmit() {
    if(this.myForm.valid) {
      console.log(this.myForm.value.name);
      this.dataService.sendMail(this.myForm.value).subscribe(data => {
      }, error => {
        if(error.statusText == 'OK') {
          this.myForm.reset();
        }
      })
    } else {
      if(this.myForm.controls.name.invalid) {
        this.errorMessage = 'Моля попълнете име'
      } else if(this.myForm.controls.phone.invalid) {
        this.errorMessage = 'Полето телефонен номер трявба да съдържа само цифри и валиден номер'
      } else if(this.myForm.controls.email.invalid) {
        this.errorMessage = 'Моля въведете валиден e-mail адрес'
      }
    }
  }

  onReset() {
    this.myForm.reset();
  }

}
