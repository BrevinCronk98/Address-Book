// Back-End for Address Book -------
function AddressBook() {
    this.contacts = [],
        this.currentId = 0
}

AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignID();
    this.contacts.push(contact);
}

AddressBook.prototype.assignID = function () {
    this.currentId += 1;
    return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
    for (var i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i]) {
            if (this.contacts[i].id == id) {
                return this.contacts[i];
            }
        }
    };
    return false;
}

AddressBook.prototype.deleteContact = function (id) {
    for (var i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i]) {
            if (this.contacts[i].id == id) {
                delete this.contacts[i];
                return true
            }
        }
    };
    return false;
}

//  Back-End for Contacts

function Contact(firstName, lastName, phoneNumber, physicalAddress) {
    this.firstName = firstName,
        this.lastName = lastName,
        this.phoneNumber = phoneNumber,
        this.physicalAddress = physicalAddress
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
}

var addressBook = new AddressBook();

// User Interface Logic ----
function displayContactDetails(addressBookToDisplay) {
    var contactList = $("#contacts");
    var htmlForContactInfo = " ";
    addressBookToDisplay.contacts.forEach(function (contact) {
        htmlForContactInfo += "<li id='" + contact.id + "'>" + contact.firstName
            + " " + contact.lastName + "</li>"
    });
    contactList.html(htmlForContactInfo);
}

function showContact(contactId) {
    var contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".physical-address").html(contact.physicalAddress)
    var buttons = $("#buttons");

    buttons.empty();
    buttons.append("<button class = 'deleteButton' id= " + contact.id + ">Delete</button>");
    buttons.append("<button class = 'hideButton' >Hide</button>")
}


function attatchContactListeners() {
    $("ul#contacts").on("click", "li", function () {
        showContact(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function () {
        addressBook.deleteContact(this.id);
        $("li#" + this.id).hide();
        $("#show-contact").hide();
        displayContactDetails(addressBook);
    });
    $("#buttons").on("click", ".hideButton", function () {
        $("#show-contact").hide();
    })

};

$(document).ready(function () {
    attatchContactListeners();
    $("form#new-contact").submit(function (event) {
        event.preventDefault();
        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();
        var inputtedPhoneNumber = $("input#phone-number").val();
        var inputtedPhysicalAddress = $("input#physical-address").val();
        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#phone-number").val("");
        $("input#physical-address").val("");
        var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPhysicalAddress);
        addressBook.addContact(newContact);
        displayContactDetails(addressBook);

    })
})
