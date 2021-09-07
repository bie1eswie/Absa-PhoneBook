import { ContactsService } from './../../services/contacts.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/dtos/contact';

import { PhoneBook } from 'src/app/dtos/phoneBook';
import {FormGroup , FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() phoneBook: PhoneBook;
  private originalcontacts: Array<Contact>;
  private searchText = '';
  contactForm!: FormGroup;
  public get SearchText(): string {
    return this.searchText;
  }
  public set SearchText(value: string) {
    this.searchText = value;
  }

  constructor(public contactservice: ContactsService, public router: Router) { }

  ngOnInit(): void {
    this.originalcontacts = this.phoneBook.contacts;
    this.createContactForm();
  }

    onFilterChanged(filter: any): void {
      this.SearchText = filter;

      if (this.SearchText && this.phoneBook.contacts != null) {
        this.phoneBook.contacts = this.originalcontacts.filter(item =>  item.name.toLowerCase().includes(filter.toLowerCase())
                                                            || item.phoneNumber.includes(filter));
      }
      else{
        this.phoneBook.contacts = this.originalcontacts;
      }
    }

    editContact(contact: Contact): void {
      contact.edit = !contact.edit;
      this.contactForm.markAllAsTouched();
    }

    saveUpdates(contact: Contact): void{
      this.contactservice.updateContact(contact)
      .subscribe((res: any) => {
       if (res.result) {
        contact.edit = false;
       }
      });
    }

    addNewContact(): void {
      const newContact: Contact = new Contact('', '', this.phoneBook.id);
      if(!this.phoneBook.contacts){
        this.phoneBook.contacts = new Array<Contact>();
      }
      this.phoneBook.contacts.push(newContact);
      this.phoneBook.contacts.reverse();
    }

    createContactForm() {
      this.contactForm = new FormGroup({
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10,15}$')]),
        name: new FormControl('', Validators.required)
      });
    }

    saveNewContact(contact: Contact): void {
      this.contactservice.addContact(contact)
      .subscribe((res: any) => {
       if (res.result) {
        contact.edit = false;
        contact.isNew = false;
        contact.id = res.result.id;
       }
      });
    }

    deletteContact(contact: Contact){
      this.contactservice.deleteContact(contact.id)
      .subscribe((res: any) => {
       if (res.result) {
        const index = this.phoneBook.contacts.indexOf(contact, 0);
        if (index > -1) {
          this.phoneBook.contacts.splice(index, 1);
        }
       }
      });
    }
}
