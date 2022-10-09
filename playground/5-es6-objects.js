//Object Shorthand

const name = 'Andrew'

const userAge = '27'

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

//Object Destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

console.log(product)

const {label:productlabel, stock, rating = 5} = product

console.log(productlabel, stock, rating)


const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

transaction('order', product)