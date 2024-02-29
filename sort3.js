let students = [
    { name: "Akshith", age: 22 },
    { name: "sistla", age: 22 },
    { name: "aksh", age: 18 },
    { name: "sist", age: 25 }
];

// Sort the students based on their ages
students.sort((student1, student2) => student2.age - student1.age);

// Display the sorted list of students
console.log("Sorted list of students based on age:");
students.forEach(student => {
    console.log(`${student.name}: ${student.age} years old`);
});
