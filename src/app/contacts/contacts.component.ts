import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public myForm: FormGroup;
  public formattedMessage: string;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.myForm.get('name').statusChanges.subscribe(name => {
      console.log(name);
    })

  }

  onSubmit() {
    if(this.myForm.valid) {
      console.log(this.myForm.value.name);
    } else {
      console.log('in valid')
    }
    this.dataService.saveFormData(this.myForm.value);
  }

  onReset() {
    this.myForm.reset();
  }

}
