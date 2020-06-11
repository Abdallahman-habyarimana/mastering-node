const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then( () => console.log('Connected to mongoDB'))
    .catch( err => console.error('Could not connect to mongodb'))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type:String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(()=> {
                    // Do some async work
                    const result = v && v.length> 0;
                    callback(result);
                }, 4000)
                // callback()  
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished},
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Node.js Course',
        category: 'Mobile',
        author: 'Nailat',
        tags: ['Network Administrator'],
        isPublished: true,
        price: 15.8
    });

    try {
        //const isValid = await course.validate();
        const result = await course.save();
        console.log(result)
    }catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
}

createCourse()






