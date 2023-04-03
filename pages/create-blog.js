import { useState } from "react";
import axios from "axios";
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRouter } from "next/router";
import { Box, Button, Divider, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [author, setAuthor] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawContent = convertToRaw(content.getCurrentContent());
    const textArray = rawContent.blocks.map(block => block.text)
    const completeText = textArray.join('');
    const formData = {
        title,
        author,
        authorId:localStorage.getItem("userId"),
        content:completeText
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        formData
      );
      
      toast.success("Blog created Successfully")

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 960,
        mx: "auto",
        my: 4,
        px: 2,
      }}
    >
      
      <form onSubmit={handleSubmit}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
        <h2>Create Post</h2>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create
        </Button>
      </Box>
        <TextField
          required
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          fullWidth
          label="Author"
          variant="outlined"
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Divider />
        <Editor
          editorState={content}
          onEditorStateChange={(editorState) => setContent(editorState)}
          wrapperStyle={{ height: "500px" }}
        />
      </form>
    </Box>
  );
};

export default CreateBlog;
