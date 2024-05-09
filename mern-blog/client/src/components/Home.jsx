import React, { useEffect, useState } from 'react';
import "../index.css"
import { Container, Button } from 'react-bootstrap';

import axios from 'axios';
// import prettyImage from './prettyImage.jpg'; // Import your pretty image

const Home = () => {
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/user/v1/getall/blogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setBlogs(res.data);

      } catch (error) {
        alert(error.response.data.message)
      }
    }
    fetchAllBlogs();
  }, [])
  return (
    <Container style={{

      width: "80% ",
      gap: "20",

      justifyContent: 'space-between',
      alignItems: 'center'



    }} className="col-md-8  my-5">
      {blogs.length > 0 ? (
        blogs.map((item) => (
          <div key={item._id} className="mb-5 ">
            <img src={`http://localhost:9000/${item.thumbnail}`} alt="Blog Thumbnail"

              style={{
                width: "800px",
                height: "600px"
              }}
              className="img-fluid b-3 " />
            <h2 className="mb-3">{item.title}</h2>
            <p>{item.description}</p>
            <a href={`/blog/${item._id}`} className="btn btn-primary">Read More</a>
          </div>
        ))
      ) : (
        <h1 className='h1' >Loading</h1>
      )}
    </Container>
  );
}

export default Home;
