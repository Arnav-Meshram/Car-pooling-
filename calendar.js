
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();



function generateCalendar(year, month) {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = ""; // Clear previous calendar if any

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate(); // Get number of days in the specified month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < weekdays.length; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = weekdays[i];
    calendarDiv.appendChild(dayDiv);
  }

  for (let i = 0; i < firstDayOfMonth; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    calendarDiv.appendChild(dayDiv);
  }


  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.classList.add("button");
    dayDiv.innerHTML = `<a href="#" onclick="showStudents(${day})">${day}</a>`;
    calendarDiv.appendChild(dayDiv);
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
}


function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}


function changeYear() {
  const selectedYear = parseInt(document.getElementById("yearSelect").value);
  currentYear = selectedYear;
  generateCalendar(currentYear, currentMonth);
}


function changeMonth() {
  const selectedMonth = parseInt(document.getElementById("monthSelect").value);
  currentMonth = selectedMonth;
  generateCalendar(currentYear, currentMonth);
}


generateCalendar(currentYear, currentMonth);

// Populate year select options
const yearSelect = document.getElementById("yearSelect");
for (let year = currentYear - 10; year <= currentYear + 10; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}
yearSelect.value = currentYear; // Set current year as selected

const firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function showStudents(day) {
  const existingStudentList = document.getElementById("studentList");
  if (existingStudentList) {
    existingStudentList.remove();
  }

  const studentsRef = database.ref(`students/${currentYear}/${currentMonth}/${day}`);
  studentsRef.once('value', (snapshot) => {
    const studentsData = snapshot.val();

    const studentListDiv = document.createElement("div");
    studentListDiv.id = "studentList";
    studentListDiv.innerHTML = "<h1>List of Students</h1>";

    if (!studentsData || Object.keys(studentsData).length === 0) {
      studentListDiv.innerHTML += "<p>No students found for this date.</p>";
    } else {
      const ul = document.createElement("ul");
      Object.values(studentsData).forEach(student => {
        const li = document.createElement("li");
        li.textContent = student;
        ul.appendChild(li);
      });
      studentListDiv.appendChild(ul);
    }

    document.body.appendChild(studentListDiv);
  });
}
