const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1, 2).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum) => {
    console.log(sum)
    return add(sum, 8)
}).then((sum) => {
    return add(sum, 28)
}).catch((e)  => {
    console.log(e)
})