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
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
const registrationForm = document.getElementById('registrationForm');
const dashboard = document.getElementById('dashboard');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const loginForm = document.getElementById('loginForm');

function registerUser() {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  progressBar.style.display = 'block';

  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((userCredential) => {
      currentUser = userCredential.user;
      console.log('User registered:', currentUser.email);
      progressBar.style.display = 'none';
      dashboard.style.display = 'block';
      displayUserTasks();
    })
    .catch((error) => {
      console.log(error.message);
      progressBar.style.display = 'none';
    });
}
function loginUser() {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  // Sign in user with email and password
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((userCredential) => {
      // Login successful
      const user = userCredential.user;
      console.log('User logged in:', user.email);
      
      dashboard.style.display = 'block';
      displayUserTasks();
      // Redirect to the dashboard or perform any other desired actions
    })
    .catch((error) => {
      // Login failed
      console.log(error.message);
    });
}

// Add event listener to the login button
const loginButton = document.getElementById('loginButton');
if (loginButton) {
  loginButton.addEventListener('click', loginUser);
}

function displayUserTasks() {
  taskList.innerHTML = '';

  if (auth.currentUser) {
    const currentUserId = auth.currentUser.uid;
    const userTasksRef = db.collection('users').doc(currentUserId).collection('tasks');

    userTasksRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const task = doc.data();
        const taskId = doc.id;
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <strong>${task.task}</strong><br>
          Project: ${task.project}<br>
          Deadline: ${task.deadline}<br>
          Description: ${task.description}
          <button onclick="deleteTask('${taskId}')">Task Done</button>
        `;
        taskList.appendChild(taskItem);
      });
    });
  }
}

function addTaskForCurrentUser(task) {
  const currentUserId = auth.currentUser.uid;
  const userTasksRef = db.collection('users').doc(currentUserId).collection('tasks');

  userTasksRef.add(task)
    .then((docRef) => {
      console.log('Task added with ID:', docRef.id);
      taskList.innerHTML = '';
      displayUserTasks();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function deleteTask(taskId) {
  const currentUserId = auth.currentUser.uid;
  const userTasksRef = db.collection('users').doc(currentUserId).collection('tasks');

  userTasksRef.doc(taskId).delete()
    .then(() => {
      console.log('Task deleted with ID:', taskId);
      displayUserTasks();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  registerUser();
});

if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
  });
}

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const projectSelect = document.getElementById('projectSelect');
  const deadlineInput = document.getElementById('deadlineInput');
  const descriptionInput = document.getElementById('descriptionInput');

  const newTask = {
    task: taskInput.value,
    project: projectSelect.value,
    deadline: deadlineInput.value,
    description: descriptionInput.value
  };

  addTaskForCurrentUser(newTask);

  taskInput.value = '';
  projectSelect.value = 'personal';
  deadlineInput.value = '';
  descriptionInput.value = '';
});

displayUserTasks();
