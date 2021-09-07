import { Contact } from 'src/app/dtos/contact';
import { PhoneBook } from './../../dtos/phoneBook';
import { Component, OnInit, Input } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  @Input() phoneBook: PhoneBook;
  public get PhoneBook(): PhoneBook {
    return this.phoneBook;
  }
  public set PhoneBook(value: PhoneBook) {
    this.phoneBook = value;
  }
  constructor(public contactService: ContactsService, public router: Router) { }

  ngOnInit(): void {
  }
}
