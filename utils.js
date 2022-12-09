"use strict";
/**
 * @template T
 * @template S
 */

/**
 * @param  {T[]]} args 
 * @returns {T}
 */
export function sum(args){
    return args.reduce((acc, cur) => acc + cur);
}

/**
 * @param {number} num
 * @returns {number}
 */
export function div(dividend, divisor){
    return Math.floor(dividend / divisor)
}

/**
 * dividend ÷ divisor = quotient ... remainder
 * @param {number} dividend 
 * @param {number} divisor 
 * @returns {[number, number]} quotient, remainder
 */
export function divmod(dividend, divisor){
    return [div(dividend, divisor), dividend % divisor]
}

/**
 * [[1, "A", []],  
 *  [false, () => {}, undefined]]  
 * 
 * => [[1, false],  
 *     ["A", () => {}],  
 *     [[], undefined]]  
 * @param {any[][]} arr
 * @return {any[][]}
 */
export function zip(...arr){
    return arr[0].map((_, i) => arr.map(array => array[i]))
}

/**
 * @template T
 * @param {T[]} array
 * @param {function(T, T): T} func
 * @param {T | undefined} acc
 * @returns 
 */
export function accumulate(array, func, acc){
    if(acc === undefined){
        acc = array.shift(0)
    }
    return [acc, ...array.map(
        cur => {
            acc = func(acc, cur)
            return acc
        }
    )]
}

/**
 * @param {number} start 
 * @param {number | undefined} end 
 * @param {number | undefined} step 
 * @returns 
 */
export function range(start, end, step=1){
    if(end === undefined){
        end = start, start = 0;
    }
    if((end - start) * step < 0){
        return []
    }
    return accumulate(
        Array.from(
            {
                length: div(end - start, step),
                0: start
            }
        ),
        (acc, _) => acc + step
    )
}

/**
 * @param {function(T): [S, boolean]} func
 * @param {T} seed
 * @returns {S[]}
 */
export function unfold(func, seed){
    const [next, done] = func(seed);
    return done
        ? [next]
        : [next, ...unfold(func, next)]
}

/**
 * toBase: (base: number, len: number) => (num: number) => number[]
 * @param {number} base
 * @param {number} len
 * @returns {function(number): number[]}
 */
export function toBase(base, len){
    /**
     * @param {number} num
     * @returns {number[]}
     */
    return num => unfold(
        /**
         * 3 ) 80       (4) => [4, 80, 0]  
         * 3 ) 26 ... 2 (3) => [3, 26, 2]  
         * 3 )  8 ... 2 (2) => [2,  8, 2]  
         * 3 )  2 ... 2 (1) => [1,  2, 2]  
         *      0 ... 2 (0) => [0,  0, 2]  
         * @param {number[]} param0 
         * @returns {[number[], boolean]}
         */
            ([len, q, r]) => [[len - 1, ...divmod(q, base)], len === 1]
            , [len, num, 0]
        ).map(array => array.pop())
}

/**
 * Choose random integer from min to max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {function(*[]):boolean} func 
 * @returns {boolean}
 */
export function not(func){
    return (...args) => !func(...args);
}
