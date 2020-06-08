const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then( () => console.log('Connected to mongoDB'))
    .catch( err => console.error('Could not connect to mongodb'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Node.js Course',
        author: 'Abdallahman',
        tags: ['Angular', 'database'],
        isPublished: true
    })
    
    const result = await course.save();
    
    console.log(result)
}

async function getCourses(){
        //comparison operator
        // eq(equal)
        //ne(not equal)
        //gt
        //gte
        //lt
        //lte
        //in
        //nin

    // const courses = await Course.find({ isPublished: true})
    // .limit(10).sort({ name: 1}).select({ name:1, tags: 1})
    // console.log(courses)
    const courses = await Course.find({ price: { $gte: 10, $lte: 20}})
    .limit(10).sort({ name: 1}).select({ name:1, tags: 1})
    console.log(courses)
}

getCourses()
