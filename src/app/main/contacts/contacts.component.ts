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

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.myForm.get('name').statusChanges.subscribe(name => {
      console.log(name);
    })

  }

  onSubmit() {
    if(this.myForm.valid) {
      console.log(this.myForm.value.name);
      this.dataService.sendMail(this.myForm.value);
    } else {
      console.log('in valid')
    }
  }

  onReset() {
    this.myForm.reset();
  }

}
