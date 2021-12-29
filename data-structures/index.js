// function addUpTo(n) {
//     let total = 0;
//     for (var i = 1; i <= n; i++) {
//         total += i;
//     }
//     return total;
// }

function addUpTo(n) {
    return n * (n + 1) / 2;
}


// // performance tester
// let t1 = performance.now(); // total time since opening the browser
// console.log(addUpTo(6))
// let t2 = performance.now();
// console.log(`total time: ${(t2 - t1) / 1000}s`)