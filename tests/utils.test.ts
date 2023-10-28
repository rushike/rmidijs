import { describe, expect, it } from 'vitest';
import { is_equal } from '../src/utils';

describe("utils functions", () => {
  it("should check `is_equal` function : ", ()=>{
    var a = new TextEncoder().encode("MThd"),
      b = new TextEncoder().encode("MThd")
      ;

    console.log(a, b);
    
    var res = is_equal(a, b);

    expect(res).toBe(true);
  })
})