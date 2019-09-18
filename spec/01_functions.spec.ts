import { isEven } from './utils';


describe('functions', () => {
    describe('parameters to functions', () => {
        it('overloading in javascript', () => {
            // Overloading in C# is many functions with same name on class with different params. You can't do this out of the box w/ Jscript.
            function formatName(first: string, last: string, mi?: string): string { // These parameters show an example of a optional parameter, which acts like overloading.
                let fullName = `${last}, ${first}`;
                if (mi) { // here is an example of an if statement checking for truthy/falsey values
                    fullName += ` ${mi}.`;
                }
                return fullName;
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        describe('returning stuff', () => {
            it('returning multiple things OOP style', () => {
                function formatName(first: string, last: string, mi?: string): { fullName: string, characters: number } { /*this is an anonymous interface that indicates the function
                                                                                                                            returns an object with at least those two props.*/
                    let fullName = `${last}, ${first}`;
                    if (mi) {
                        fullName += ` ${mi}.`;
                    }
                    return {
                        fullName, // if the variable you are returning is the same as the anon interface name you do not need to specify like fullName: fullName.
                        characters: fullName.length
                    };
                }
                const result = formatName('Han', 'Solo');
                expect(result.fullName).toBe('Solo, Han');
                expect(result.characters).toBe(9);

                // Object Destructuring. This is a way to get only the specific properties you want from an object that may have many that you don't need.

                // const { fullName } = formatName('Luke', 'Skywalker');
                // expect(fullName).toBe('Skywalker, Luke');

                const { fullName: fn } = formatName('Luke', 'Skywalker');
                expect(fn).toBe('Skywalker, Luke'); // this says when you call formatName put the value of the result into a variable called fn.
            });
            it('returning things functional style', () => {
                function formatName(first: string, last: string, mi?: string): [string, number] { // the function now returns a tuple
                    let fullName = `${last}, ${first}`;
                    if (mi) {
                        fullName += ` ${mi}.`;
                    }
                    return [fullName, fullName.length];
                }

                // Array Destructuring.
                const result = formatName('Han', 'Solo');
                expect(result[0]).toBe('Solo, Han');
                expect(result[1]).toBe(9);

                const [fn, l] = formatName('Luke', 'Skywalker');
                expect(fn).toBe('Skywalker, Luke');
                expect(l).toBe(15);
            });
            it('fun with array destructuring', () => {
                const numbers = [1, 2, 3, 4, 5];

                const [first, , tacos] = numbers; // this is not an array. These are two new variables in this scope only. (inside this it block).
                expect(first).toBe(1);
                expect(tacos).toBe(3);

                const [head, ...tail] = numbers; // Head will be 1. Tail will be the rest of the numbers.
                expect(head).toBe(1);
                expect(tail).toEqual([2, 3, 4, 5]); // To be checks to see if things are the exact same object. To equal just checks if they are the same object.

            });
            it('fun with object desctructuring', () => {
                const employee = {
                    firstName: 'Sue',
                    lastName: 'Smith',
                    job: 'DEV',
                    lastPayChecks: [23_500, 22_800, 18_123]
                };
                const { job, lastName: last } = employee; // creating a new variable with objects is by property name. Property name then variable name.
                expect(last).toBe('Smith');
                expect(job).toBe('DEV');
            });
            it('adding some numbers', () => {
                function add(a: number = 20, b: number = 10, ...rest: number[]) { // example of default arguments.
                    const firstTwo = a + b;
                    return rest.reduce((s, n) => s + n, firstTwo); // an example of higher order fucntion.
                }
                expect(add(2, 2)).toBe(4);
                expect(add(2)).toBe(12);
                expect(add()).toBe(30);
                expect(add(undefined, 5)).toBe(25); // if you pass in undefined and only undefined as the first arg the default value will be selected.
                expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });
        });
    });
});
describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('you can do soemthing with each of these', () => {
        numbers.forEach((num) => console.log(num)); // in the anon funct params you could also pass in the index and the reference to the array itself e.g. (num, index, reference);
    });
    describe('array methods that return something (e.g. another array)', () => {
        it('you can create a new array using filter', () => {
            const evens = numbers.filter(n => n % 2 === 0); /* none of these methods modify the original array. They return a new array.
                                                            Here, Filter takes a function that takes a number and returns a boolean */
            expect(evens).toEqual([2, 4, 6, 8]);

            const evens2 = numbers.filter(isEven); // This just points filter to a function in the utils file that does the same as above.
        });
        it('create an array of mutated elements', () => {
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });
        it('your test- make this work', () => {
            const doubledEvens = numbers.filter(isEven)
                .map(n => n * 2);
            expect(doubledEvens).toEqual([4, 8, 12, 16]);
        });
        it('return a single value - checking membership', () => {
            const allEven = numbers.every(isEven); /* .every applies the function to every element of the array, and if that functions returns true for every element of the array it returns true.
                                                    in actuality the first time the target function returns a false .every returns a false. */
            expect(allEven).toBe(false);

            const someEven = numbers.some(isEven); // As soon as the target function returns true .some returns true.
            expect(someEven).toBe(true);
        });
        it('boiling an array down to a single value', () => {

            const total = numbers.reduce((c, n) => c + n); // c is the aggregator, n is the value from the array.
            expect(total).toBe(45);

            const total2 = numbers.reduce((c, n) => c + n, 100); // this shows the optional third parameter (100). It sets the starting count to 100.
            expect(total2).toBe(145);
        });
    });
});
