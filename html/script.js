// Initialize Firebase
const firebaseConfig = {
 apiKey: 'AIzaSyBFSBMzkOGpGRm8M3lvomxBa-8UhAVxpTs',
      authDomain: 'taskey-1766b.firebaseapp.com',
      projectId: 'taskey-1766b',
      storageBucket: 'taskey-1766b.appspot.com',
      messagingSenderId: '159932481852',
      appId: '1:159932481852:web:b6ca0829b83ac34ce99e39'
    };

    firebase.initializeApp(firebaseConfig);

    // Login function
    function loginUser() {


      const email = emailInputl.value;
      const password = passwordInputl.value;
      var em = email;

     
      // Use Firebase authentication to sign in the user
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Login successful, do something like redirect to another page
          console.log('Login successful!');
          window.location.href = 'tool.html';
          // For example, you can redirect to the dashboard page:
          // window.location.href = 'dashboard.html';
        })
        .catch((error) => {
          // Handle login errors
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Login error:', errorCode, errorMessage);
          alert(error.message); // Show the error message to the user
        });
    }
  
