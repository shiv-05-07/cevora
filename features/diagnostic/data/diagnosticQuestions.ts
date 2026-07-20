import { DiagnosticQuestion } from '../types';

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // VARIABLES (3)
  {
    id: 'var_1',
    concept: 'Variables',
    difficulty: 'BEGINNER',
    question: 'Which keyword is used to declare a block-scoped variable in modern JavaScript?',
    options: [
      { id: 'A', text: 'var' },
      { id: 'B', text: 'let' },
      { id: 'C', text: 'dim' },
      { id: 'D', text: 'int' }
    ],
    correctAnswer: 'B',
    explanation: 'The "let" keyword allows you to declare variables that are limited to the scope of a block statement.'
  },
  {
    id: 'var_2',
    concept: 'Variables',
    difficulty: 'INTERMEDIATE',
    question: 'What is the output of the following code?\n```js\nlet x = 10;\n{\n  let x = 20;\n}\nconsole.log(x);\n```',
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '10' },
      { id: 'C', text: 'undefined' },
      { id: 'D', text: 'ReferenceError' }
    ],
    correctAnswer: 'B',
    explanation: 'Variables declared with "let" are block-scoped, so the outer x remains 10.'
  },
  {
    id: 'var_3',
    concept: 'Variables',
    difficulty: 'ADVANCED',
    question: 'Which of the following is true about "const" declarations?',
    options: [
      { id: 'A', text: 'They make the value entirely immutable.' },
      { id: 'B', text: 'They require an initial value at declaration.' },
      { id: 'C', text: 'They are globally scoped by default.' },
      { id: 'D', text: 'They can be reassigned if inside a function.' }
    ],
    correctAnswer: 'B',
    explanation: '"const" declarations must be initialized. They prevent reassignment of the variable, but do not make objects immutable.'
  },

  // LOOPS (3)
  {
    id: 'loop_1',
    concept: 'Loops',
    difficulty: 'BEGINNER',
    question: 'Which loop is guaranteed to execute at least once?',
    options: [
      { id: 'A', text: 'for loop' },
      { id: 'B', text: 'while loop' },
      { id: 'C', text: 'do...while loop' },
      { id: 'D', text: 'for...in loop' }
    ],
    correctAnswer: 'C',
    explanation: 'A do...while loop evaluates its condition after the first iteration, guaranteeing at least one run.'
  },
  {
    id: 'loop_2',
    concept: 'Loops',
    difficulty: 'INTERMEDIATE',
    question: 'What keyword skips the current iteration of a loop and moves to the next one?',
    options: [
      { id: 'A', text: 'break' },
      { id: 'B', text: 'continue' },
      { id: 'C', text: 'return' },
      { id: 'D', text: 'next' }
    ],
    correctAnswer: 'B',
    explanation: '"continue" skips the rest of the code in the current iteration and starts the next iteration.'
  },
  {
    id: 'loop_3',
    concept: 'Loops',
    difficulty: 'ADVANCED',
    question: 'What is the correct syntax for iterating over the enumerable properties of an object?',
    options: [
      { id: 'A', text: 'for (let key in obj)' },
      { id: 'B', text: 'for (let key of obj)' },
      { id: 'C', text: 'forEach(obj)' },
      { id: 'D', text: 'while (key in obj)' }
    ],
    correctAnswer: 'A',
    explanation: 'The for...in statement iterates over all enumerable string properties of an object.'
  },

  // ARRAYS (3)
  {
    id: 'arr_1',
    concept: 'Arrays',
    difficulty: 'BEGINNER',
    question: 'How do you access the first element of an array named "arr"?',
    options: [
      { id: 'A', text: 'arr[1]' },
      { id: 'B', text: 'arr[0]' },
      { id: 'C', text: 'arr.first()' },
      { id: 'D', text: 'arr.get(0)' }
    ],
    correctAnswer: 'B',
    explanation: 'Arrays are zero-indexed, so the first element is at index 0.'
  },
  {
    id: 'arr_2',
    concept: 'Arrays',
    difficulty: 'INTERMEDIATE',
    question: 'Which array method removes the last element and returns it?',
    options: [
      { id: 'A', text: 'push()' },
      { id: 'B', text: 'pop()' },
      { id: 'C', text: 'shift()' },
      { id: 'D', text: 'unshift()' }
    ],
    correctAnswer: 'B',
    explanation: 'The pop() method removes the last element from an array and returns that element.'
  },
  {
    id: 'arr_3',
    concept: 'Arrays',
    difficulty: 'ADVANCED',
    question: 'Which method creates a new array populated with the results of calling a provided function on every element?',
    options: [
      { id: 'A', text: 'filter()' },
      { id: 'B', text: 'reduce()' },
      { id: 'C', text: 'map()' },
      { id: 'D', text: 'forEach()' }
    ],
    correctAnswer: 'C',
    explanation: 'The map() method creates a new array by executing a function on each element.'
  },

  // STRINGS (3)
  {
    id: 'str_1',
    concept: 'Strings',
    difficulty: 'BEGINNER',
    question: 'Which operator is used to concatenate strings in JavaScript?',
    options: [
      { id: 'A', text: '&' },
      { id: 'B', text: '+' },
      { id: 'C', text: '.' },
      { id: 'D', text: 'concat' }
    ],
    correctAnswer: 'B',
    explanation: 'The plus (+) operator is used to concatenate (join) strings together.'
  },
  {
    id: 'str_2',
    concept: 'Strings',
    difficulty: 'INTERMEDIATE',
    question: 'How can you find the length of a string named "str"?',
    options: [
      { id: 'A', text: 'str.length()' },
      { id: 'B', text: 'str.size' },
      { id: 'C', text: 'str.length' },
      { id: 'D', text: 'length(str)' }
    ],
    correctAnswer: 'C',
    explanation: 'The length property returns the length of a string.'
  },
  {
    id: 'str_3',
    concept: 'Strings',
    difficulty: 'ADVANCED',
    question: 'What does the string method "slice(1, 4)" do?',
    options: [
      { id: 'A', text: 'Extracts from index 1 to 4 (inclusive)' },
      { id: 'B', text: 'Extracts from index 1 up to index 4 (exclusive)' },
      { id: 'C', text: 'Extracts 4 characters starting at index 1' },
      { id: 'D', text: 'Removes characters from index 1 to 4' }
    ],
    correctAnswer: 'B',
    explanation: 'slice() extracts a section of a string from the start index up to, but not including, the end index.'
  },

  // FUNCTIONS (3)
  {
    id: 'fn_1',
    concept: 'Functions',
    difficulty: 'BEGINNER',
    question: 'Which of the following is a valid function declaration?',
    options: [
      { id: 'A', text: 'function = myFunc() {}' },
      { id: 'B', text: 'function myFunc() {}' },
      { id: 'C', text: 'def myFunc() {}' },
      { id: 'D', text: 'create function myFunc() {}' }
    ],
    correctAnswer: 'B',
    explanation: 'The standard function declaration syntax starts with the "function" keyword followed by the name.'
  },
  {
    id: 'fn_2',
    concept: 'Functions',
    difficulty: 'INTERMEDIATE',
    question: 'What is an arrow function?',
    options: [
      { id: 'A', text: 'A function that only executes once.' },
      { id: 'B', text: 'A shorter syntax for writing function expressions.' },
      { id: 'C', text: 'A function that always returns a boolean.' },
      { id: 'D', text: 'A function that can point to other variables.' }
    ],
    correctAnswer: 'B',
    explanation: 'Arrow functions (=>) provide a more concise syntax for writing function expressions.'
  },
  {
    id: 'fn_3',
    concept: 'Functions',
    difficulty: 'ADVANCED',
    question: 'What is a closure?',
    options: [
      { id: 'A', text: 'A function that takes another function as an argument.' },
      { id: 'B', text: 'A combination of a function bundled together with references to its surrounding state.' },
      { id: 'C', text: 'A function that has no return statement.' },
      { id: 'D', text: 'A function defined inside an object.' }
    ],
    correctAnswer: 'B',
    explanation: 'A closure gives you access to an outer function\'s scope from an inner function.'
  },

  // OBJECTS (3)
  {
    id: 'obj_1',
    concept: 'Objects',
    difficulty: 'BEGINNER',
    question: 'How do you access the "name" property of an object "person"?',
    options: [
      { id: 'A', text: 'person(name)' },
      { id: 'B', text: 'person->name' },
      { id: 'C', text: 'person.name' },
      { id: 'D', text: 'person::name' }
    ],
    correctAnswer: 'C',
    explanation: 'Dot notation is the standard way to access object properties.'
  },
  {
    id: 'obj_2',
    concept: 'Objects',
    difficulty: 'INTERMEDIATE',
    question: 'Which method is used to get an array of an object\'s own enumerable string-keyed property names?',
    options: [
      { id: 'A', text: 'Object.keys()' },
      { id: 'B', text: 'Object.properties()' },
      { id: 'C', text: 'Object.getNames()' },
      { id: 'D', text: 'Object.entries()' }
    ],
    correctAnswer: 'A',
    explanation: 'Object.keys() returns an array of a given object\'s own enumerable property names.'
  },
  {
    id: 'obj_3',
    concept: 'Objects',
    difficulty: 'ADVANCED',
    question: 'What does Object.freeze() do?',
    options: [
      { id: 'A', text: 'Prevents extensions, making the object non-extensible.' },
      { id: 'B', text: 'Makes an object immutable, preventing new properties from being added and existing ones from being modified.' },
      { id: 'C', text: 'Deeply clones an object.' },
      { id: 'D', text: 'Seals an object so values can be changed but properties cannot be deleted.' }
    ],
    correctAnswer: 'B',
    explanation: 'Object.freeze() freezes an object, completely preventing modifications to its properties and values.'
  },

  // LOGIC (2)
  {
    id: 'log_1',
    concept: 'Logic',
    difficulty: 'INTERMEDIATE',
    question: 'What does the strict equality operator (===) check?',
    options: [
      { id: 'A', text: 'Values only, ignoring type' },
      { id: 'B', text: 'Value and Type' },
      { id: 'C', text: 'Memory reference only' },
      { id: 'D', text: 'Length and type' }
    ],
    correctAnswer: 'B',
    explanation: 'Strict equality (===) checks both the value and the type, without performing type conversion.'
  },
  {
    id: 'log_2',
    concept: 'Logic',
    difficulty: 'ADVANCED',
    question: 'What is the result of `false || 0 || "hello" || null`?',
    options: [
      { id: 'A', text: 'false' },
      { id: 'B', text: '0' },
      { id: 'C', text: '"hello"' },
      { id: 'D', text: 'null' }
    ],
    correctAnswer: 'C',
    explanation: 'The logical OR operator (||) returns the first truthy value it encounters, which is "hello".'
  }
];
