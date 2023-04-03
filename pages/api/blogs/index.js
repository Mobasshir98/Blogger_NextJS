import Blog from '../../models/blog';
import dbConnect from '../../utils/db';

import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const config = {
    api: {
      responseLimit: "4mb",
    },
  }
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs',
    format: async (req, file) => 'png', 
    public_id: (req, file) => `blog-${Date.now()}`, 
  },
});

const upload = multer({ storage: storage, });

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
      } catch (error) {
        res.status(400).json({ message: 'Error getting blogs', error });
      }
      break;
    case 'POST':
        try {
            const { title, content, author,authorId } = req.body;
    
            let image = null;
    
            
            if (req.file) {
              const result = await cloudinary.v2.uploader.upload(req.file.path);
              image = result.secure_url;
            }
    
            const blog = await Blog.create({
              title,
              content,
              author,
              authorId,
              image,
            });
    
            res.status(201).json({ success: true, data: blog });
          } catch (error) {
            console.log(error)
            res.status(400).json({ success: false });
          }
          break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
