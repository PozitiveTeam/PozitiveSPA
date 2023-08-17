import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  accountForm: UntypedFormGroup;
  constructor(private _formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    // Create the form
    this.accountForm = this._formBuilder.group({
      name: ['Brian Hughes'],
      username: ['brianh'],
      title: ['Senior Frontend Developer'],
      company: ['YXZ Software'],
      about: ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
      email: ['hughes.brian@mail.com', Validators.email],
      phone: ['121-490-33-12'],
      country: ['usa'],
      language: ['english']
    });
  }

}
