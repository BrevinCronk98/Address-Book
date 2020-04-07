// Back-End for Address Book -------
function AddressBook()
{
    this.contacts=[],
    this.currentId= 0
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
    return false;
}

AddressBook.prototype.deleteContact = function(id){
    var item = document.getElementById(id)
    for(var i=0; i< this.contacts.length; i++){
        if(this.contacts[i]){
            if(this.contacts[i] == id){
                delete this.contacts[i];
                return true
            }
        }
    };
    return false;
}

//  Back-End for Contacts

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

var addressBook = new AddressBook();

// User Interface Logic ----
function displayContactDetails(addressBookToDisplay) {
    var contactList = $("#contacts");
    var htmlForContactInfo = " ";
    addressBookToDisplay.contacts.forEach(function(contact){
        htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName
 + " " + contact.lastName  + "</li>"   });
 contactList.html(htmlForContactInfo);

}

function showContact(contactId){
    var contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    var buttons = $("#buttons");
    
//     buttons.empty();
//     buttons.append("<button class = 'deleteButton' id= 'button" + contact.id + "'>Delete</button>");
}

function removeName(itemId){

}

function attatchContactListeners() {
    var thisId;
    $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
    //alert(this.id);
    });

};

$(document).ready(function() {
    attatchContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#phone-number").val();
    var inputtedPhysicalAddress = $("input#inputted-physical-address").val();
    
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressBook.contacts);
    console.log(contacts);

  });


});
