
describe("Pending specs", function(){

    xit("can start with an xit", function(){
        expect(true).toBe(true);
    });

    it("is a pending test if there is no callback function");

    it("is pending if the pending function is invoked inside the callback", function(){
        expect(2).toBe(2);
        pending();
    });

});

/*
spy: is mock that isolates unit reducing dependency on other unit
https://www.cloudbees.com/blog/jasmine-spyon
*/ 
 
// beforeEach: run before each "it" callback
// without this I have define the value in each it
describe("Arrays", function() {
    var arr;
    beforeEach(function() {
        arr = [1, 3, 5]
        it("adds elements to an array", function() {
            arr.push(7)
            expect(arr).toEqual([1, 3, 5, 7])
        })

        it("returns the new length of the array", function() {
            expect(arr.push(7)).toBe(4)
        })

        it("adds anything into the array", function() {
            expect(arr.push({})).toBe(4)
        })
    })
})

// afterEach: run after each "it" callback -> useful for the resets 
describe("Counting", function() {
    var count = 0

    beforeEach(function() {
        count++
    })

    afterEach(function() {
        count = 0
    })

    it("has a counter that increments", function() {
        expect(count).toBe(1)
    })

    it("gets reset", function() {
        expect(count).toBe(1)
    })
})

// beforeAll / afterAll: run before/after all tests without reset
var arr = []
beforeAll(function() {
    arr = [1, 2, 3]
})

describe("Counting", function() {
    it("starts with an array", function() {
        arr.push(4)
        expect(1).toBe(1)
    })

    it("keeps mutating that array", function() {
        console.log(arr)
        arr.push(5)
        expect(1).toBe(1)
    })
})

describe("Again", function() {
    it("keeps mutating the array... again", function() {
        console.log(arr)
        expect(1).toBe(1)
    })
})

// nesting describe: for a big test
describe("Array", function() {
    var arr
    beforeEach(function() {
        arr = [1, 3, 5]
    })

    describe("#unshift", function() {
        it("adds an element to the beginning of an array", function() {
            arr.unshift(17)
            expect(arr[0].toBe(17))
        })

        it("returns the new length", function() {
            expect(arr.unshift(1000)).toBe(4)
        })
    })

    describe("#push", function() {
        it("adds elements to the end of an array", function() {
            arr.push(7)
            expect(arr[arr.length - 1]).toBe(7)
        })

        it("returns the new length", function() {
            expect(arr.push(1000)).toBe(4)
        })
    })
})

// pending test: used when doesn't know what will be tested
/*
ways:
- append x before it 
- append pending at the end of it block
- omit callback function in it
*/ 

describe("Pending specs", function() {
    xit("can start with an wit", function() {
        expect(true).toBe(true)
    })

    it("is pending if the pending function is invoked inside the callback", function() {
        expect(2).toBe(2)
        pending()
    })
    
    it("is a pending test if there is no callback function")
})