const students = [
  { rollNo: 1, name: "Kalash Srivastava", status: "" },
  { rollNo: 2, name: "Arjun Tripathi", status: "" },
  { rollNo: 3, name: "Anjali Singh", status: "" },
  { rollNo: 4, name: "Juhi Tiwari", status: "" },
];

const tbody = document.getElementById("studentBody");

students.forEach((student, index) => {
  const row = document.createElement("tr");

  const rollCell = document.createElement("td");
  rollCell.textContent = student.rollNo;

  const nameCell = document.createElement("td");
  nameCell.textContent = student.name;

  const statusCell = document.createElement("td");
  const presentBtn = document.createElement("button");
  presentBtn.textContent = "Present";
  presentBtn.onclick = () => updateStatus(index, "Present");

  const absentBtn = document.createElement("button");
  absentBtn.textContent = "Absent";
  absentBtn.onclick = () => updateStatus(index, "Absent");

  statusCell.appendChild(presentBtn);
  statusCell.appendChild(absentBtn);

  row.appendChild(rollCell);
  row.appendChild(nameCell);
  row.appendChild(statusCell);
  tbody.appendChild(row);
});

function updateStatus(index, status) {
  students[index].status = status;
  const row = tbody.rows[index];
  row.cells[2].textContent = status;
  row.cells[2].style.color = status === "Present" ? "green" : "red";
}

function exportToCSV() {
  let csvContent = "Roll No.,Name,Status\n";
  students.forEach((s) => {
    csvContent += `${s.rollNo},${s.name},${s.status || "Not Marked"}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "attendance.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
