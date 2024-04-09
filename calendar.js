// Get current date
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// Function to generate calendar for the given year and month
function generateCalendar(year, month) {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = ""; // Clear previous calendar if any

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate(); // Get number of days in the specified month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Display month and year
  document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < weekdays.length; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = weekdays[i];
    calendarDiv.appendChild(dayDiv);
  }

  // Fill in days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    calendarDiv.appendChild(dayDiv);
  }

  // Calendar dates
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.classList.add("button");
    dayDiv.innerHTML = `<a href="#" onclick="showStudents(${day})">${day}</a>`;
    calendarDiv.appendChild(dayDiv);
  }
}

// Function to navigate to the previous month
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
}

// Function to navigate to the next month
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}

// Function to handle year change
function changeYear() {
  const selectedYear = parseInt(document.getElementById("yearSelect").value);
  currentYear = selectedYear;
  generateCalendar(currentYear, currentMonth);
}

// Function to handle month change
function changeMonth() {
  const selectedMonth = parseInt(document.getElementById("monthSelect").value);
  currentMonth = selectedMonth;
  generateCalendar(currentYear, currentMonth);
}

// Generate calendar for the current month
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
