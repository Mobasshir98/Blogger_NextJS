const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Blog;

try{
    Blog = mongoose.model("Blog")
}
catch{
 
    const blogSchema = new Schema({
        title: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          author: {
            type: String,
            required: true,
          },
          authorId:{
            type:String,
          },
          image: {
            type: String,
            default: null,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          comments: [commentSchema],

    });
    Blog = mongoose.model('Blog', blogSchema);
}

export default Blog

  

