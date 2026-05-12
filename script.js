// ---------- AUTH CHECK ----------
if (
  window.location.pathname.includes("home.html") &&
  !localStorage.getItem("user")
) {
  window.location.href = "index.html";
}

// ---------- SIGNUP ----------
function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;

  if (user === "" || pass === "") {
    alert("All fields required");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Signup successful");
  window.location.href = "index.html";
}

// ---------- LOGIN ----------
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  if (
    user === localStorage.getItem("user") &&
    pass === localStorage.getItem("pass")
  ) {
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials");
  }
}

// ---------- LOGOUT ----------
function logout() {
  alert("Logged out successfully");
  window.location.href = "index.html";
}

// ---------- STUDENT MANAGEMENT (ONLY HOME PAGE) ----------
if (document.getElementById("studentList")) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  document.getElementById("welcome").innerText =
  "Welcome, " + localStorage.getItem("user");


  function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let dept = document.getElementById("dept").value;
    let mail = document.getElementById("mail").value;
    let phn = document.getElementById("num").value;

    if (name === "" || roll === "" || dept === "") {
      alert("All fields required");
      return;
    }

    students.push({ name, roll, dept,mail,phn });
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }

  function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((s, index) => {
      list.innerHTML += `
        <tr>
          <td>${s.name}</td>
          <td>${s.roll}</td>
          <td>${s.dept}</td>
          <td>${s.mail}</td>
          <td>${s.phn}</td>
          <td>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>`;
    });
  }

  function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}


  function searchStudent() {
    let search = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#studentList tr");

    rows.forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(search)
        ? ""
        : "none";
    });
  }

  displayStudents();
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}