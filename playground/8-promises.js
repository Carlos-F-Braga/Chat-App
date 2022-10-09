const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1, 2, 5, 7, 9]) //only first one called executes
        reject('Things went wrong ;-;')
        resolve(1)
    }, 2000)
})

doWorkPromise.then(result => console.log(result)).catch(error => console.log('error', error))


//                        Fullfilled
//                      / - resolve
// Promise ---- Pending
//                      \ - reject
//                        Rejected