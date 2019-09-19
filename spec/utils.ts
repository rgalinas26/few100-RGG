export const add = (a: number, b: number) => a + b;
export function isEven(num: number): boolean {
    return num % 2 === 0;
}



/* formatter is a function that takes a string and a function that takes a string and returns a string.
Once the interior replacement is dont then the function f takes over. */

export function formatter(message: string, f: (x: string) => string): string {
    return f(message.replace(' ', '_').toUpperCase()); // this replaces spaces with underscores
    //   and uppercases a string
}

export function identity(x: any) {
    return x;
}

export function jesseDecorator(char: string) {
    return (s: string) => `${char}${char}${char}${s}${char}${char}${char}`;
}
