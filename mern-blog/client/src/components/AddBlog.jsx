import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {


  const [category, setCategories] = useState([])
  const [file, setFile] = useState([]);
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: "",

  });


  const navigate = useNavigate();






  useEffect(() => {


    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9000/user/v1/getall/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        setCategories(res.data);
        console.log(input.category);

      } catch (error) {
        alert(error.response.data.message)
      }

    }
    fetchAllCategories();


  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", input.title)
    console.log(input.category);
    formdata.append("category", input.category)
    formdata.append("description", input.description)
    formdata.append("thumbnail", file);
    try {
      const res = await axios.post(`http://localhost:9000/user/v1/add/blog`, formdata,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }

      )
      alert(res.data.message);
      navigate("/")

    } catch (error) {
      alert(error.response.data.message)

    }

  }





  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="w-75 bg-white p-5 rounded">
        <h1 className="text-center mb-4">Create a Blog</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter title"
            name="title" value={input.title} onChange={(e) => setInput(

              {
                ...input, [e.target.name]: e.target.value
              })}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category"
            name="category" value={input.category} onChange={(e) => setInput(

              { ...input, [e.target.name]: e.target.value }

            )}

          >
            <option disabled >Select Category</option>
            {category && category.map((item) => (
              <option value={item._id}>{item.title}</option>
            ))}


            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Description</label>
          <textarea className="form-control" id="content" rows="5" placeholder="Enter your blog content"
            name="description" value={input.description} onChange={(e) => setInput(

              {
                ...input, [e.target.name]: e.target.value
              })}

          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Thumbnail</label>
          <input type="file" className="form-control" id="image"

            name="file" onChange={(e) => setFile(e.target.files[0])}

          />
        </div>
        <button type="submit" className="btn btn-primary ">Read more</button>
      </form >

    </div >
  );
}

export default AddBlog;
