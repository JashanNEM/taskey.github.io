const firebaseConfig = {
    apiKey: 'AIzaSyBFSBMzkOGpGRm8M3lvomxBa-8UhAVxpTs',
         authDomain: 'taskey-1766b.firebaseapp.com',
         projectId: 'taskey-1766b',
         storageBucket: 'taskey-1766b.appspot.com',
         messagingSenderId: '159932481852',
         appId: '1:159932481852:web:b6ca0829b83ac34ce99e39'
       };

      firebase.initializeApp(firebaseConfig);
      
      const emailInput = document.getElementById('emailInput');
      const passwordInput = document.getElementById('passwordInput');
      const registerButton = document.getElementById('registerButton');
      const userID = null;
      var designationInput= document.getElementById('designationInput').value;
      var islogin = false;
      // Register user function
      function registerUser() {
        const email = emailInput.value;
        const password = passwordInput.value;
      
        // Use Firebase authentication to create a new user
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
           userID = firebase.auth().currentUser.uid;
           
           var database = firebase.database();
           
            
            window.location.href = 'tool.html';
          })
          .catch((error) => {
            // Handle registration errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
            alert('Registration failed. Please try again.');
          });
      }
      
      // Add event listener to the register button
      registerButton.addEventListener('click', registerUser);
