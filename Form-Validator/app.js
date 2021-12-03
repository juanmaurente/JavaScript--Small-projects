// 1 ---- First event listeners (blur means i am leaving that element) then do  that function


// Form Blur Event Listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);


//2----- create those funcitons
function validateName() {
  const name = document.getElementById('name');
  const re = /^[a-zA-Z]{2,10}$/; 
            //starts letters(lower and captal) from 2 to 10 letters from ^ to $

  if(!re.test(name.value)){ 
        //if the value doesnt pass, then..
    name.classList.add('is-invalid'); // dynamically adding a class for the msg
  } else {
    name.classList.remove('is-invalid'); // dynamically delete a class for the msg
  }
}

function validateZip() {
  const zip = document.getElementById('zip');
  const re = /^[0-9]{5}(-[0-9]{4})?$/; 
          // in US zip starts with 5 digits, and then a - (dash) 4 more OPTIONAL digits

  if(!re.test(zip.value)){
    zip.classList.add('is-invalid');
  } else {
    zip.classList.remove('is-invalid');
  }
}

function validateEmail() {
  const email = document.getElementById('email');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        //the first group ()can be letters or numbers underscore_ dashes- and . dots (we have to use the escape charac \)
        // + because we are searching more
        // then we have to see @ which is a literal character
        // the second group can be similar to the first
        // + again because we are searching for more
        // \. to represent the dot .com .net .io
        // final group just letters 2 to 5 


  if(!re.test(email.value)){
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
  }
}

function validatePhone() {
  const phone = document.getElementById('phone');
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
     //we have to accept different formats - . ()
     //  \(?  \d{3}  \)? will take (555) - pharentesis are not a group, are literals and are optional, the first 3 digists are considered
     // [-. ] accept a dash a dot or a space for a number as OPTIONAL, then considere the following 3 digits
     // repeat and finally 4 digits (in USA there are 10 numbers)


  if(!re.test(phone.value)){
    phone.classList.add('is-invalid');
  } else {
    phone.classList.remove('is-invalid');
  }
}