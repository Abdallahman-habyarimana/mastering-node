// Using References ( Normalization)
let author = {
    name: 'Abdallah'
}

let course = {
    author: 'id'
}

// Using Embedded Documents ( Denormalization)


let course = {
    author: {
        name: ''
    }
}