const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0)
            return reject('Numbers must be positive')

            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, 99)
    const sum2 = await add(sum, 9249)
    const sum3 = await add(sum2, 9545339)
    const sum4 = await add(sum3, 9643669)
    return sum4
}

doWork().then((result) => {
    console.log(result)
})
