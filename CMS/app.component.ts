import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contact-manage';

  ContactArray :any[] =[] ;
  isResultLoaded =false ;
  isUpdateFormactive =false;

  name :string= "";
  phonenumber :string = "";
  address :string = "";
  currentContactID = "";

  constructor(private http : HttpClient){
    this.getAllContact();
  }
  ngOnInit() : void{}

  // Retrieving data from database
  getAllContact()
  {
    this.http.get("http://localhost:8080/api/contacts")
    .subscribe((resultData : any) =>{
      this.isResultLoaded =true;
      console.log(resultData.data);
      this.ContactArray=resultData.data;
    });
    
  }
  // Adding A COntact using http , subscribe() method
   addContact(){
    let bodyData ={
      "name": this.name,
      "phonenumber" : this.phonenumber,
      "address" : this.address
    };
    this.http.post("http://localhost:8080/api/contacts/add",bodyData)
    .subscribe((resultData:any)=>{
      console.log(resultData);
      this.getAllContact();
      alert("Contact Added Successfully");
    });
    this.name = '';
    this.phonenumber = '';
    this.address = '';
   }
   // Updating COntacts

   setUpdate(data:any)
   {
    this.name=data.name;
    this.phonenumber=data.phonenumber;
    this.address= data.address;
    this.currentContactID = data.id;
   }

   UpdateContact()
   {
    let bodyData_up ={
      "name":this.name,
      "phonenumber":this.phonenumber,
      "address":this.address
    };
    this.http.put("http://localhost:8080/api/contacts/update"+"/"+this.currentContactID,bodyData_up)
    .subscribe((resultData:any)=>
      {
        console.log(resultData);
        alert("COntact Update Successfully");
        this.getAllContact();
      });
      this.name = '';
      this.phonenumber = '';
      this.address = ''; 
   }
   // Save button to add contacts
   save()
   {
    if(this.currentContactID == '')
      {
        this.addContact();
      }
      else
      {
        this.UpdateContact();
      }
   }

   // Delelting a Contacts from database
   deleteContact(data:any)
   {
    this.http.delete("http://localhost:8080/api/contacts/delete"+"/"+data.id)
    .subscribe((resultData:any)=>
      {
        console.log(resultData);
        alert("Contact deleted Sucessfully");
        this.getAllContact();
    });
   }
}
