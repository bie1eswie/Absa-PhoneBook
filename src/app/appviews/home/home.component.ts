import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';
import { PhoneBook } from 'src/app/dtos/phoneBook';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  phoneBookForm!: FormGroup;
  addnew: boolean;
  noPhoneBooks: boolean;
  phoneBook: PhoneBook;
  private phoneBooks: Array<PhoneBook>;
  public get PhoneBooks(): Array<PhoneBook> {
    return this.phoneBooks;
  }
  public set PhoneBooks(value: Array<PhoneBook>) {
    this.phoneBooks = value;
  }

  constructor(public contactService: ContactsService, public router: Router) {

  }

  ngOnInit(): void {
    this.getPhoneBooks();
    this.createPhoneBookForm();
  }
  getPhoneBooks(): void {
    this.contactService.getAllContacts()
      .subscribe((res: any) => {
        this.PhoneBooks = res.result.result;
        this.noPhoneBooks = this.PhoneBooks.length == 0;
      });
    }
    createPhoneBookForm(){
      this.phoneBookForm = new FormGroup({
        name: new FormControl('', Validators.required)
      });
    }
  addPhoneBook(){
this.addnew = !this.addnew;
this.phoneBook = new PhoneBook('');
  }

  savePhoneBook(){
    this.contactService.addPhoneBook(this.phoneBookForm.value)
    .subscribe((res: any) => {
      if (res.result) {
        this.PhoneBooks.push(res.result);
        this.noPhoneBooks =  false;
      }
     }),(error)=>{
      console.error('Backend - ' +
      `status: ${error.status}, ` +
      `statusText: ${error.statusText}, ` +
      `message: ${error.error.message}`);
     };
  }

}
