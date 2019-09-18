describe('declaring variables', () => {
    describe('using let', () => {
        it('declaring variable with let', () => {
            let name;

            name = 'Jeff';

            expect(name).toBe('Jeff');
            expect(typeof (name)).toBe('string');

            name = 1337;

            expect(name).toBe(1337);
            expect(typeof (name)).toBe('number');
        });
        it('`explicitly typing`', () => {
            let name: string | number; // example of union types i.e. variables that have at least two types.
            name = 'Jeff';
            name = 123;
        });
        it('implicitly typed variables', () => {
            let name = 'Jeff'; // Typing is not necessary here, and if you were to put :string here the compiler would warn you.
            name = 'Jeffry';
        });
    });

    describe('constants', () => {
        it('has them and prefers them', () => {
            const pi = 3.1415;
            // pi = 3; would cause an error.
            const friends = ['Sean', 'Reggie', 'Sara'];
            // friends = []; would cause an error.
            friends[2] = 'David';
            const movie = { title: 'The Force Awakens', director: 'Lucas' };
            // movie = {}; would cause an error.
            movie.director = 'Abrams';
            const age = 50;
            expect(age).toBe(50);
        });
    });
    describe('var and why it is evil and you should not use it.', () => {
        it('does not have block scope!', () => {
            const age = 22;
            if (age > 21) {
                // tslint:disable-next-line: no-var-keyword
                var message;
                message = 'Old Enough';
            }
            expect(message).toBe('Old Enough');
        });
    });
    describe('literals ', () => {
        it('has a bunch of numeric literals', () => {
            const n1 = 123;
            const n2 = 3.14; // the data type for both of these is "number".
            const bigNumber = 12_123_520; // you can use underscores instead of commas for readability.
            const hexNumber = 0xff; // hexidecimal numbers start with 0x.
            const binary = 0b101010; // binary numbers start with 0b.
            const octalNumber = 0o567; // octal numbers start with 0o.

            const pay = parseInt('42.83', 10);
            expect(pay).toBe(42);
            const pay2 = parseFloat('42.83');
            expect(pay2).toBe(42.83);
        });
        it('string literals', () => {
            const title = 'Jones';
            expect(title).toBe('Jones');
        });
        it('template strings', () => {
            const s1 = `Tacos`;
            expect(typeof (s1)).toBe('string');

            const story = `My life story.
            It was a dark and stormy night.
            I taught some programming.
            The end.`; // using backtick to delimit string literals allows for multi line string literals.

            const name = 'bob';
            const age = 42;
            const oldSchool = 'The name is ' + name + ' and the age is ' + age + ' years';
            const newSchool = `The name is ${name} and the age is ${age} years`; // backtick allows for better string concatenation.
            expect(newSchool).toBe(oldSchool);
        });
        it('has aray literals', () => {
            const luckyNumbers = [9, 20, 108];
            expect(luckyNumbers[0]).toBe(9);
            luckyNumbers[999] = 50;

            expect(luckyNumbers[100]).toBeUndefined();

            let friends: string[];

            friends = ['Bill', 'Beth'];

            // tslint:disable-next-line: max-line-length
            let someArray: (string | number)[]; // this is one way to declare union arrays. This is an array that could be either a string or a number.
            someArray = [99, 'dog', 'cat', 42];

            let someArray2: Array<string | number>; // this is a secondary way to declare union arrays.
        });
        it('intro to tuples', () => {
            type SettingOption = 'log' | 'warn' | 'trace';
            type Setting = [boolean, SettingOption, SettingOption, SettingOption];
            let setting: Setting;

            setting = [true, 'log', 'warn', 'trace'];

            let example2: [boolean, string, string, string];
            example2 = [true, 'log', 'warn', 'trace'];

            // setting = ['dog', false]; this won't compile
            const isSet = example2[0];
            const allowLog = example2[1]; // here, intelesense knowns that isSet is a boolean and that allowLog is a string.
        });
    });
    describe('function literals', () => {
        it('three different ways to declare a function - plus methods in a class we will do later ', () => {
            // named function
            function add(a: number, b: number): number { /* the :number after the parameters is the return type.
                                                        The advantage of a name function is that you can forward declare i.e call
                                                        before it is declares */
                return a + b;
            }

            // anonymous function
            const subtract = function (a: number, b: number): number {
                return a - b;
            };

            const multiply = (a: number, b: number): number => a * b; // this function does not need a return statement because the right side of the eq is an expression.
            const divide = (a: number, b: number): number => {
                if (b === 0) {
                    throw new Error('Are you trying to divide by zero?');
                } else {
                    return a / b;
                }
            };
            expect(add(10, 2)).toBe(12);
            expect(subtract(10, 2)).toBe(8);
            expect(multiply(10, 2)).toBe(20);
        });
    });
    describe('object literals', () => {
        it('has them', () => {
            type MPAARating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'; // A type alias
            interface Movie {
                title: string;
                director: string;
                yearReleased: number;
                MPAARating?: MPAARating; // this says that any object that implements this interace might have a rating (?)
                [key: string]: any; // this line says that long with the things above, a user can add anything else
            }

            const movie: Movie = {
                title: 'Thor',
                director: 'Taika Waititi',
                yearReleased: 2016
            };

            expect(movie.title).toBe('Thor');
            // tslint:disable-next-line: no-string-literal
            expect(movie['title']).toBe('Thor'); // these are both legal ways to access the properties of objects, but the [] notation is NOT preferred.

            movie.yearReleased = 2017; // you can update properties.

            movie.MPAARating = 'PG-13';
            movie.cast = ['Chirs Hemsworth', 'Tom Hiddleston', 'Mark Ruffalo'];
            movie.watched = true; // you can add this property and the above property because of the code at line 151.
        });
        it('making a dictionary', () => {
            interface Vehicle {
                vin: string;
                make: string;
                model: string;
                year: number;
            }

            interface Dictionary<T> {
                [key: string]: T;
            }



            const myVehicles: Dictionary<Vehicle> = {
                '83989sjioe': {
                    vin: '83989sjioe',
                    make: 'Chevy',
                    model: 'Bolt',
                    year: 2018
                },
                xyzpdq: {
                    vin: 'xyzpdq',
                    make: 'Honda',
                    model: 'Pilot',
                    year: 2019
                }

            };

            expect(myVehicles['83989sjioe'].make).toBe('Chevy');
        });
        it('duck typing', () => {
            function doSomething(thing: { message: string }) { // inside the paramters is an anonymous interface.
                console.log(thing.message);
            } // this is called duck-typing because "if it walks like a duck..." this function looks for anything with a message property.

            doSomething({ message: 'Call your mom' });

            const phoneCall = {
                from: 'Sue',
                time: 'AM',
                message: 'Call me back'
            };

            doSomething(phoneCall); // the function does not care what is being passed in as long as that argument has a message property (comports w/ the interace)
        });
    });
});
