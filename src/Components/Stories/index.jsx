import React, { useEffect, useState, useRef } from "react"
import Cookies from "js-cookie"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./index.css"
import { useNavigate } from "react-router-dom"
const PrevArrow = ({ onClick, currentSlide }) => (
  <div
    className={`custom-arrow left ${currentSlide === 0 ? "disabled" : ""}`}
    onClick={onClick}
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="15"
        fill={currentSlide === 0 ? "#E5E5E5" : "#334155"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.333 27.5C23.7596 27.5 24.1863 27.353 24.5113 27.0605C25.1629 26.4739 25.1629 25.5259 24.5113 24.9393L19.0031 19.9815L24.3029 15.0416C24.9413 14.4446 24.9229 13.495 24.2613 12.9204C23.598 12.3459 22.543 12.3624 21.9047 12.9564L15.4682 18.9569C14.8365 19.5464 14.8449 20.481 15.4882 21.06L22.1547 27.0605C22.4797 27.353 22.9063 27.5 23.333 27.5Z"
        fill="white"
      />
    </svg>
  </div>
)

const NextArrow = ({ onClick, currentSlide, storyCount }) => {
  const isEnd = currentSlide >= storyCount - 7
  return (
    <div
      className={`custom-arrow right ${isEnd ? "disabled" : ""}`}
      onClick={onClick}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect
          x="5"
          y="5"
          width="30"
          height="30"
          rx="15"
          fill={isEnd ? "#E5E5E5" : "#334155"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.667 28C17.2404 28 16.8137 27.853 16.4887 27.5605C15.8371 26.9739 15.8371 26.0259 16.4887 25.4393L21.9969 20.4815L16.6971 15.5416C16.0587 14.9446 16.0771 13.995 16.7387 13.4204C17.402 12.8459 18.457 12.8624 19.0953 13.4564L25.5318 19.4569C26.1635 20.0464 26.1551 20.981 25.5118 21.56L18.8453 27.5605C18.5203 27.853 18.0937 28 17.667 28Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

const Stories = () => {
  const [storyDetails, setStoryDetails] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStories = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("JWTTOKEN")}`,
        },
      }
      try {
        const response = await fetch("https://apis.ccbp.in/insta-share/stories", options)
        const data = await response.json()
        setStoryDetails(data.users_stories)
      } catch (error) {
        console.error("Error fetching stories:", error)
      }
    }
    fetchStories()
  }, [])

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex)
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  }
  console.log(storyDetails)
  return (
    <div className="stories-container">
      <PrevArrow currentSlide={currentSlide} onClick={handlePrev} />
      <div className="stories-wrapper">
        <Slider {...settings} ref={sliderRef}>
          {storyDetails.map((story) => (
            <div onClick={()=>navigate(`/stories/${story.user_id}`)} className="story-card" key={story.user_id}>
              <img className="story-image" src={story.story_url} alt="story" />
              <p className="story-username">{story.user_name}</p>
            </div>
          ))}
        </Slider>
      </div>
      <NextArrow
        currentSlide={currentSlide}
        onClick={handleNext}
        storyCount={storyDetails.length}
      />
    </div>
  )
}

export default Stories
