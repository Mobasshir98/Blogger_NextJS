
import Blog from '../../models/blog';
import dbConnect from '../../utils/db';

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  }= req;
  switch (method) {
    case 'POST':
      try {
        const { author, content } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
          res.status(404).json({ message: 'Blog not found' });
        } else {
          const comment = { author, content };
          blog.comments.push(comment);
          const updatedBlog = await blog.save();
          res.status(201).json(updatedBlog);
        }
      } catch (error) {
        res.status(400).json({ message: 'Error adding comment', error });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
