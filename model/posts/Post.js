const mongoose = require('mongoose');

//title, desc, category, image
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Dev Diaries', 'Stories', 'Books', 'Jurnal creștin'],
    },
    image: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//compile schema to form model

const Post = mongoose.model('Post', postSchema);

//export model
module.exports = Post;
