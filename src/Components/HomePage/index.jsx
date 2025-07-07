import "./index.css"
import { Link } from 'react-router-dom'
import Stories from '../Stories'
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Post from "../Post"
import { Riple } from "react-loading-indicators"
const HomePage = () => {
  const [posts, setPosts] = useState(null)
  let options = {
    method:"GET",
    headers:{
        Authorization:`Bearer ${Cookies.get("JWTTOKEN")}`
    }
  }
  useEffect(()=>{
    const fetchPosts = async () => {
        const response = await fetch("https://apis.ccbp.in/insta-share/posts",options)
        const data = await response.json()
        setPosts(data.posts)
    }
    fetchPosts()
  },[])
    return (
      <div>
        <Stories />
        <div className="postsCont">
          {posts !== null ? (
            posts.map((e) => {
              return <Post postDetails={e} key={e.post_id} />;
            })
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              <Riple color="#00dfd6" size="medium" text="" textColor="" />
            </div>
          )}
        </div>
      </div>
    );
}

export default HomePage 