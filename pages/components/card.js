import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function MediaCard({title,content,id,authorId}) {

  const router = useRouter()

  const handleDelete = async ()=>{
try{
  const response = axios.delete(`http://localhost:3000/api/blogs/${id}`)
  toast.success((await response).data.message)
  router.push("/")
  
}
catch(err){
  toast.error(err.response.data.message)

}
  }
  return (
    <Card  sx={{ maxWidth: 345,display:"flex",flexDirection:"column", justifyContent:"space-between" }} >
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.substring(0,100)}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"space-between"}} >
        <Link href={`/blog/${id}`} >
        <Button size="small">Learn More</Button> 
        </Link>
        {
          (typeof window !== 'undefined'&&(localStorage.getItem("role")==="admin"||localStorage.getItem("userId")===authorId))&&  <Button onClick={handleDelete} > <DeleteIcon/></Button>
        }
      </CardActions>
    </Card>
  );
}