import { Observable } from 'rxjs';
import { Contact } from './../dtos/contact';
import { Constants } from './../utilities/constants';
import { Injectable } from '@angular/core';
import { DataService } from './DataService.service';
import { PhoneBook } from '../dtos/phoneBook';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private addContactEndPoint: string = Constants.ServerURL + '/api/contact/addNewContact';
  private getAllContactsEndPoint: string = Constants.ServerURL + '/api/contact/getContacts';
  private getContactEndPoint: string = Constants.ServerURL + '/api/contact/';
  private deleteContactEndPoint: string = Constants.ServerURL + '/api/contact';
  private updateContactEndPoint: string = Constants.ServerURL + '/api/contact/updateContact';
  private addPhoneBookEndPoint: string = Constants.ServerURL + '/api/contact/addNewPhoneBook';
  constructor(public dataService: DataService) { }


  addPhoneBook(newContact: any): Observable<any> {

    this.dataService.set(this.addPhoneBookEndPoint);
    return this.dataService.post(newContact);
  }

  addContact(newContact: Contact): Observable<any> {

    this.dataService.set(this.addContactEndPoint);
    return this.dataService.post(JSON.stringify(newContact));
  }
  getUserByID(id: string): Observable<any> {
    const getByIdUrl = this.getContactEndPoint + '/' + id;
    this.dataService.set(getByIdUrl);
    return this.dataService.get();
  }
  getAllContacts(): Observable<any> {
    this.dataService.set(this.getAllContactsEndPoint);
    return this.dataService.get();
  }

  updateContact(contact: Contact): Observable<any> {
    this.dataService.set(this.updateContactEndPoint);
    return this.dataService.put(contact);
  }

  deleteContact(id: number): Observable<number> {
    const deleteByIdUrl = this.deleteContactEndPoint + '/' + id;
    this.dataService.set(deleteByIdUrl);
    return this.dataService.delete();
  }
}
