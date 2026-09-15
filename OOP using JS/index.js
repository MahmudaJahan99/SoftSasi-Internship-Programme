const { Guardian, Student, Teacher } = require("./person");
const { Contact, Address } = require("./contact");
const { Department, Subject } = require("./university");

// ***** GUARDIAN 1 *****
const guardian = new Guardian(1, "Mr. Khaled", "Engineer", 75000);
guardian.blood = "O+";
guardian.contact = new Contact({
  id: 1,
  email: "khaled@test.com",
  phone: "123456789",
});
guardian.contact.address = new Address({
  id: 1,
  roadNo: "6b",
  city: "Dhaka city",
  region: " Dhaka",
  country: "Bangladesh",
  postalCode: 1200,
});

// console.log(guardian.toString());
// console.log(guardian.contact + "");
// console.log(guardian.contact.address.country)
// console.log(guardian.contact.phone)
// console.log(guardian.blood)

// ***** STUDENT 1 *****
const student = new Student(1, "Rafi", "ST001", guardian);
student.blood = "A+";
student.contact = new Contact({
  id: 2,
  email: "rafi@test.com",
  phone: "987654321",
  alternativePhone: student.guardian.contact.phone,
  address: student.guardian.contact.address,
});

// console.log(student);
// console.log(student.toString());

// ***** DEPARTMENT 1 *****
const department = new Department({ id: 1, name: "SWE" });
student.department = department;
department.subjects = [
  new Subject(1, "Computer Fundamentals", 4),
  new Subject(2, "Software Engineering", 3),
  new Subject(3, "Peripheral Devices", 3),
];

// console.log(student.department.toString())

// Calculate total credit
const credit = student.department.subjects.reduce((a, b) => {
  a += b.credit;
  return a;
}, 0);

// console.log(`Total Credit`, credit);

// ***** TEACHER 1 *****
const dean = new Teacher(1, "Mr. Biplob", department.subjects[0], "EMP001");
dean.blood = "AB+";
dean.department = department;
dean.salary = 100000;
dean.contact = new Contact({
  id: 3,
  email: "biplop@test.com",
  phone: "0134679258",
  address: new Address({
    id: 2,
    roadNo: "423 AB",
    city: "Dhaka City",
    region: "Dhaka",
    country: "Bangladesh",
    postalCode: 1212,
  }),
});

// ***** TEACHER 2 *****
const teacher1 = new Teacher(1, "Mr. Afjal", department.subjects[1], "EMP1002");
teacher1.department = department;
teacher1.blood = "O+";
teacher1.salary = 40000;
teacher1.contact = new Contact({
  id: 4,
  email: "afjal@test.com",
  phone: "0134679200",
  address: new Address({
    id: 3,
    roadNo: "403 CB",
    city: "Dhaka City",
    region: "Dhaka",
    country: "Bangladesh",
    postalCode: 1212,
  }),
});

// ***** TEACHER 3 *****
const teacher2 = new Teacher(1, "Mr. Ruma", department.subjects[2], "EMP1003");
teacher2.department = department;
teacher2.blood = "AB-";
teacher2.salary = 40000;
teacher2.contact = new Contact({
  id: 4,
  email: "ruma@test.com",
  phone: "0134678200",
  address: new Address({
    id: 3,
    roadNo: "433 LB",
    city: "Dhaka City",
    region: "Dhaka",
    country: "Bangladesh",
    postalCode: 1212,
  }),
});

department.dean = dean;
department.addTeacher(dean);
department.addTeacher(teacher1);
department.addTeacher(teacher2);

// console.log(student)
// console.log(student.department)

// List all teachers in the department
student.department.teachers.forEach((teacher, index) => {
  console.log(`${index + 1}. ${teacher.name} (${teacher.subject.name})`);
});

// console.log(dean)
// console.log(dean.department);

// Add student to guardian
guardian.addChild(student);

// console.log(guardian);

// Calculate total salary of teachers in the department
const teacherSalary = guardian.children[0].department.teachers.reduce(
  (acc, cur) => {
    acc += cur.salary;
    return acc;
  },
  0,
);

// console.log(teacherSalary)

// Count the number of people with blood type "O+" in the student's family and department
let count = 0
if(student.blood === "O+") count++
if(student.guardian.blood === "O+") count++

student.department.teachers.forEach(teacher => {
    if(teacher.blood === "O+") count++
})

console.log(count)