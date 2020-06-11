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
  authors: [authorSchema]
}));

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save()
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    course.remove()
    course.save();
}
async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
const course = await Course.update({ _id: courseId}, {
  $set: {
    'author.name': 'Nailat Hassan'
  }
})
}

//createCourse('Node Course',[new Author({ name: 'Mosh' }), new Author({ name: 'Abdallah' })] );
//updateAuthor('5ee211b71606f90a10f40a18')

//addAuthor('5ee2156fa664833610119e83', new Author({ name: 'Jeff'}))

removeAuthor('5ee2156fa664833610119e83','5ee2167150ee7438f83c03cb')