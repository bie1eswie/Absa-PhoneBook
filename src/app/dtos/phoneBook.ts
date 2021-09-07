import { Contact } from './contact';


export class PhoneBook {
    public name: string;
    public contacts: Array<Contact>;
    public id: number;
    constructor(name:string){
      this.name = name;
    }
}
