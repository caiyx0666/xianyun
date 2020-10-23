// 倒数的函数
// const count = (num) => {
//     console.log(num);
//     if (num>0) {
//         count(num - 1)
//     }
// }

// count(10)

// 斐波那契数列
// [1,1,2,3,5,8,13,21]
const feibo = (index) => {
    if(index<=2) return 1

    return feibo(index - 1) + feibo(index - 2)
}

console.log(feibo(8))