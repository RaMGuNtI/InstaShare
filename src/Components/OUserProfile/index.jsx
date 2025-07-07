import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Riple } from 'react-loading-indicators'
const OUserProfile = () => {
    const {id} = useParams()
    
  const [profile, setProfile] = useState(null)
    let options = {
      method:"GET",
      headers:{
        Authorization:`Bearer ${Cookies.get("JWTTOKEN")}`
      }
    }
    useEffect(()=>{
      const fetchProfile = async () => {
        const response = await fetch(`https://apis.ccbp.in/insta-share/users/${id}`, options)
        const data = await response.json()
        console.log(data)
        setProfile(data.user_details)
      }
      fetchProfile()
    },[])
   return profile !== null ? (
     <div className="profilePage">
       <div className="selfInfo">
         <div className="profile-pic">
           <img src={profile.profile_pic} />
         </div>
         <div className="nameDetails">
           <h2>{profile.user_name}</h2>
           <div className="followDetails">
             <p>{profile.posts_count} posts</p>
             <p>{profile.followers_count} followers</p>
             <p>{profile.following_count} following</p>
           </div>
           <div className="idAbout">
             <p>
               <b>{profile.user_id}</b>
             </p>
             <p>{profile.user_bio}</p>
           </div>
         </div>
       </div>

       {/* Stories placed BELOW the profile info now */}
       <div className="storiesSection">
         {profile.stories.map((e, index) => (
           <div key={index}>
             <img src={e.image} />
           </div>
         ))}
       </div>

       <hr />

       <div className="postSection">
         <h2>
           <svg
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M19.3125 3H3.5625C3.2625 3 3 3.2625 3 3.5625V19.3125C3 19.6125 3.2625 19.875 3.5625 19.875H19.3125C19.6125 19.875 19.875 19.6125 19.875 19.3125V3.5625C19.875 3.2625 19.6125 3 19.3125 3ZM4.125 4.125H8.25V8.25H4.125V4.125ZM4.125 9.375H8.25V13.5H4.125V9.375ZM8.25 18.75H4.125V14.625H8.25V18.75ZM13.5 18.75H9.375V14.625H13.5V18.75ZM13.5 13.5H9.375V9.375H13.5V13.5ZM13.5 8.25H9.375V4.125H13.5V8.25ZM18.75 18.75H14.625V14.625H18.75V18.75ZM18.75 13.5H14.625V9.375H18.75V13.5ZM18.75 8.25H14.625V4.125H18.75V8.25Z"
               fill="#262626"
             />
           </svg>
           Posts
         </h2>
         <div className="posts">
           {profile.posts.length !== 0 ? (
             profile.posts.map((e, index) => <img key={index} src={e.image} />)
           ) : (
             <img src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751709077/Group_7731_jksr9i.png" />
           )}
         </div>
       </div>
     </div>
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
   );
  
}

export default OUserProfile