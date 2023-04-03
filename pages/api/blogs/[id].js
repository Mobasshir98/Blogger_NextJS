import Blog from '../../models/blog';
import dbConnect from '../../utils/db';

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          res.status(404).json({ message: 'Blog not found' });
        } else {
          res.status(200).json(blog);
        }
      } catch (error) {
        res.status(400).json({ message: 'Error getting blog', error });
      }
      break;
    case 'PUT':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          res.status(404).json({ message: 'Blog not found' });
        } else {
          const { title, content, author, image } = req.body;
          blog.title = title || blog.title;
          blog.content = content || blog.content;
          blog.author = author || blog.author;
          blog.image = image || blog.image;
          const updatedBlog = await blog.save();
          res.status(200).json(updatedBlog);
        }
      } catch (error) {
        res.status(400).json({ message: 'Error updating blog', error });
      }
      break;
    case 'DELETE':
      try {
        const deletedBlog = await Blog.findByIdAndRemove(id);
        if (!deletedBlog) {
          res.status(404).json({ message: 'Blog not found' });
        } else {
          res.status(200).json({ message: 'Blog deleted successfully' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Error deleting blog', error });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
