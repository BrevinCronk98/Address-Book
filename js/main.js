function AddressBook()
{
this.contacts=[];
this.currentId= 0;
}
AddressBook.prototype.addContact = function (contact){
contact.id = this.assignID();
this.contacts.push(contact);
}

AddressBook.prototype.assignID = function(){
    this.currentId += 1;
    return this.currentId;
}

AddressBook.prototype.findContact = function(id){
    for(var i =0; i < this.contacts.length; i ++){
        if(this.contacts[i]){
            if(this.contacts[i].id == id){
                return this.contacts[i];
            }
        }
    };
    return falses
}