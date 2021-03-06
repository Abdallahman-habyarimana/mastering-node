const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
//  const course= await Course.findById(courseId);
//  course.author.name = 'Abdallah'
//  course.save();
// unset is used to remove 
const course = await Course.update({ _id: courseId}, {
  $set: {
    'author.name': 'Nailat Hassan'
  }
})
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5ee211b71606f90a10f40a18')