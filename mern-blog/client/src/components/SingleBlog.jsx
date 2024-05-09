import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
const SingleBlog = () => {

  const { id } = useParams();
  const [blog, setpreviewBlog] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/user/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })


        setpreviewBlog(res.data)

      } catch (error) {
        console.error("Error fetching blog:", error);

      }
    }
    fetchBlog();
  }, [id])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card mb-3">
            <img src={`http://localhost:9000/${blog.thumbnail}`} className="card-img-top" alt="Blog" />
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>

              <p className="card-text">{blog.description}</p>
            </div>
            <button onClick={() => navigate("/")} className='btn btn-primary '>GoTo Blogs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog


