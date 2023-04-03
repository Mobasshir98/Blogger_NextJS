import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';

const styles = {
    root: {
      padding: "1rem",
      "& .MuiPaperRoot": {
        padding: "1rem",
      },
      "& .commentForm": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        "& .MuiTextField-root": {
          marginBottom: "1rem",
        },
      },
    },
    comment: {
      padding: "1rem",
      marginBottom: "1rem",
      "& .MuiTypography-subtitle1": {
        fontWeight: "bold",
      },
      "& .MuiTypography-subtitle2": {
        fontSize: "0.75rem",
      },
    },
  };
const BlogDetailPage = ({ blog }) => {
  const [content, setContent] = useState('');
  const [author,setAuthor]=useState('')
  const router = useRouter();
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/blogs/comments/?id=${blog._id}`, {
        author,
        content
      });
    //   console.log(response);
      setContent('');
      setAuthor('')
      router.push(`/blog/${blog._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4">{blog.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              By {blog.author}
            </Typography>
            <Typography variant="body1">{blog.content}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Posted on {new Date(blog.createdAt).toDateString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {blog.comments.length === 0 && (
            <Typography variant="body1">No comments yet.</Typography>
          )}
          {blog.comments.map((comment) => (
            <Paper key={comment._id} style={styles.comment} >
              <Typography variant="subtitle1">{comment.author}</Typography>
              <Typography variant="body1">{comment.content}</Typography>
              <Typography variant="subtitle2" gutterBottom>
                Posted on {new Date(comment.createdAt).toDateString()}
              </Typography>
            </Paper>
          ))}
          <form onSubmit={handleSubmit} >
            <Box width={"40%"} display={"flex"} flexDirection={"column"} >
            <TextField
              required
              
              label="Name"
              variant="outlined"
              margin="normal"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              />
            <TextField
              required
              
              label="Add a comment"
              variant="outlined"
              margin="normal"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              />
            <Button type="submit" variant="contained" sx={{width:"20%"}} >
              Add Comment
            </Button>
              </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default BlogDetailPage;

export async function getServerSideProps(context) {

    const { params } = context;
    console.log(params)
    const id = params.id;
    const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
    const data = res.data;
    
    return {
      props: {
        blog: data,
        suppressHydrationWarning: true,
      }
    }
  }