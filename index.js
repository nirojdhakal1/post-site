// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCjJJgB1Dbnm4F3PMEaXP98ztZ1yxiKsmQ",
    authDomain: "cosmic-strategy-375907.firebaseapp.com",
    projectId: "cosmic-strategy-375907",
    storageBucket: "cosmic-strategy-375907.appspot.com",
    messagingSenderId: "775036199233",
    appId: "1:775036199233:web:5b3e1571812e2188e381c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    // Get all our input fields
signup_email = document.getElementById('signup_email').value
signup_password = document.getElementById('signup_password').value
signup_password_confirm = document.getElementById('signup_password_confirm').value
signup_full_name = document.getElementById('signup_full_name').value

// Validate input fields
if (validate_email(signup_email) == false || validate_password(signup_password) == false) {
  alert('Email or Password is Outta Line!!')
  return
  // Don't continue running the code
}
if (validate_field(signup_full_name) == false) {
  alert('One or More Extra Fields is Outta Line!!')
  return
}

// Check if the password and confirm password fields match
if (signup_password !== signup_password_confirm) {
  alert('Passwords do not match!')
  return
}

// Move on with Auth
auth.createUserWithEmailAndPassword(signup_email, signup_password)
.then(function() {
  // ... rest of the function ...

      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        signup_email : signup_email,
        signup_full_name : signup_full_name,
        signup_password : signup_password,
        signup_password_confirm : signup_password_confirm,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('login_email').value
    password = document.getElementById('login_password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      window.location.href = "main/main.html";
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }