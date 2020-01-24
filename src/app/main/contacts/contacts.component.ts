import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.mobile.scss']
})
export class ContactsComponent implements OnInit {

  public contactForm: FormGroup;
  public formattedMessage: string;
  public errorMessage: string;
  public successMessage: string;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      message: ['', Validators.required]
    });

    this.contactForm.get('name').statusChanges.subscribe(name => {
      console.log(name);
    })

  }

  onSubmit() {
    if(this.contactForm.valid) {
      console.log(this.contactForm.value.name);
      this.dataService.sendMail(this.contactForm.value).subscribe(data => {
      }, error => {
        if(error.statusText == 'OK') {
          this.contactForm.reset();
          this.successMessage = 'Благодарим, че се свързахте с нас. Вашето съобщение, че бъде прегледано възможно най-скоро и при необходимост ще се свържем с вас в най-кратък срок!';
        }
      })
    } else {
      if(this.contactForm.controls.name.invalid) {
        this.errorMessage = 'Моля попълнете име'
      } else if(this.contactForm.controls.phone.invalid) {
        this.errorMessage = 'Полето телефонен номер трявба да съдържа само цифри и валиден номер'
      } else if(this.contactForm.controls.email.invalid) {
        this.errorMessage = 'Моля въведете валиден e-mail адрес'
      }
    }
  }

  onReset() {
    this.contactForm.reset();
  }

}
