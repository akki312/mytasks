var languages = ["JavaScript", "Python", "C++", "Java", "Lua"];

// truncate the Array to 3 elements
languages.length = 3

// Output: [ 'JavaScript', 'Python', 'C++' ]
console.log(languages)

// extend the Array to length 6
languages.length = 6

// Output: [ 'JavaScript', 'Python', 'C++', <3 empty items> ]
console.log(languages)