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

// async function updateCourse(id){
//     //Approach: Query first
//     //findById()
//     // Modify its properties
//     // save()

//     const course = await Course.findById(id);
//     if(!course) return;
//     course.isPublished = true;
//     course.author = 'Another Author B1'

//     // Another approach to update
//     // course.set({
//     //     isPublished: true,
//     //     author: 'Another Author'
//     // })
//     const result = await course.save();
//     console.log(result)

// }

async function updateCourse(id){
  
    const course = await Course.findByIdAndUpdate({_id: id }, {
        $set: {
            author: 'Jailan ',
            isPublished: false
        }
    }, {new : true});
    console.log(course)

}

updateCourse('5a68fdd7bee8ea64649c2777');

// async function getCourses(){
//     const courses = await Course.find({ price: { $gte: 10, $lte: 20}})
//     .limit(10).sort({ name: 1}).select({ name:1, tags: 1})
//     console.log(courses)
// }

//getCourses()
