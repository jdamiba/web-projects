const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const guest = document.getElementById('guest');
const guest_food = document.getElementById('guest_food');
const reservation_number = document.getElementById('reservation_number');
const reservation_number_2 = document.getElementById('reservation_number');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not correctly formatted!');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `Must be at least ${min} characters!`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `Must be less than ${max} characters!`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Reservation Numbers do not match!');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([name, email, reservation_number, reservation_number_2]);
  checkLength(name, 3, 15);
  checkLength(reservation_number, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(reservation_number, reservation_number_2);
});

guest.addEventListener('change', function(e) {
  if (guest.value == "Yes"){
    guest_food.style.display = "block";
  }

  if (guest.value == "No"){
    guest_food.style.display = "none";
  }
});
