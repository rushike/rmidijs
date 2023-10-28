import { BufType } from './types';

export function sleep (ms : number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Deep clones the object
 * @param o {any} object to deep clone
 * @returns {object} deep cloned object
 */
export function clone(o : any): object {
	if (typeof o != 'object') return (o);
	if (o == null) return (o);
	var ret = (typeof o.length == 'number') ? [] : {};
  // @ts-ignore
	for (var key in o) ret[key] = clone(o[key]);
	return ret;
};

export function is_arraylike(a : any) : boolean {
  return (a!=null && typeof(a[Symbol.iterator])==='function');
}

/**
 * Check the object equality
 * @param a {object} value
 * @param b {object} value
 * @returns {boolean} if object **a** is equal to object **b**
 */
export function is_equal (a : any, b : any): boolean {
  if(typeof a !== typeof b) return false;

  if (typeof a !== 'object') return a === b;

  if (is_arraylike(a) && is_arraylike(b)) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  
  if (Object.keys(a) !== Object.keys(b)) return false;

  for(let key in a) {
    if (!is_equal(a[key], b[key])) return false;
  }
  return false
}



/**
 * masked number convert number stored in buf array to number.
 * @param data {BufType} buffer
 * @param mask {number | number[]} mask to applied on each element of buffer
 * @returns {number} return the number value stored in BufType with given 'mask'
 */
export function masked_number(data : BufType, mask : number | number[]): number {
  if (typeof mask === 'number') mask = Array(data.length).fill(mask);

  var num = 0;

  for(let i = 0; i < data.length; i++) {
    let bits = Math.log2(mask[i]) + 1;
    num = num << bits | data[i] & mask[i];
  }
  return num;
}