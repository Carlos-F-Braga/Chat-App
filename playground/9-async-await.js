const doWork = async () => {
    return 3 + 5
    throw 'WRONG'
}

doWork().then((result) => {
    console.log('result', result)
}).catch((err) => {
    console.log('err', err)
})