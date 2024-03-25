import React, { useContext, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MailList } from '../components/MailList';
import { Footer } from '../components/Footer';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import useFetch from '../hooks/useFetch';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import { Reserve } from '../components/Reserve';

const HotelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
`
const HotelWrapper = styled.div`
  width: 70%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const HotelTitle = styled.span`
  font-size: 24px;
`
const HotelAddress = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`
const HotelImgWrapper = styled.div`
  width: 33%;
  position: relative;
`
const HotelDistance = styled.span`
  color: #0071c2;
  font-weight: 500;
`
const HotelPriceHighlight = styled.span`
  color: green;
`
const HotelImages = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`
const HotelImg = styled.img`
  width: 100%;
  object-fit: cover;
`
const HotelDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`
const HotelDetailsTexts = styled.div`
  flex: 3;
`
const HotelDetailsPrice = styled.div`
  flex: 1;
  background-color: #ebf3ff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > h3{
    font-size: 18px;
    color: #555;
  }
  & > span{
    font-size: 14px;
    font-weight: 300;
  }
  & > button{
    border: none;
    padding: 10px 10px; 
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
  }
`
const BookNow = styled.button`
  position: absolute;
  right: 155px;
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`
const HotelDesc = styled.p`
  font-size: 14px;
  margin-top: 20px;
`
const FooterContainer = styled.div`
  margin-left: -115px;
`
const Slider = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.426);
  z-index: 999;
  display: flex;
  align-items: center;
`
const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SliderImg = styled.img`
  width: 80%;
  height: 80vh;
`
const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
`
const Arrow = styled.div`
  margin: 20px;
  font-size: 50px;
  color: lightgray;
  cursor: pointer;
`

export const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false)

  const { data, loading } = useFetch(`/hotel/find/${id}`)
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)


  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  }


  const handleClick = () => {
    if(user){
      setOpenModel(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <>
      <Navbar />
      <Header type="list" />

      {loading ? "loading" : (<HotelContainer>

        {open && <Slider>
          <Close>
            <CancelIcon onClick={() => setOpen(false)} />
          </Close>

          <Arrow>
            <ArrowCircleLeftIcon onClick={() => handleMove("l")} />
          </Arrow>

          <SliderWrapper>
            <SliderImg src={data.photos[slideNumber]}></SliderImg>
          </SliderWrapper>

          <Arrow>
            <ArrowCircleRightIcon onClick={() => handleMove("r")} />
          </Arrow>

        </Slider>
        }

        <HotelWrapper>
          <BookNow onClick={handleClick}>Reserve or Book Now!</BookNow>
          <HotelTitle>{data.name}</HotelTitle>

          <HotelAddress>
            <LocationOnIcon />
            <span>{data.address}</span>
          </HotelAddress>

          <HotelDistance>
            Excellent location - {data.distance} from center
          </HotelDistance>

          <HotelPriceHighlight>
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </HotelPriceHighlight>

          <HotelImages>
            {data.photos?.map((photo, i) => (
              <HotelImgWrapper key={i}>
                <HotelImg onClick={() => handleOpen(i)} src={photo}></HotelImg>
              </HotelImgWrapper>
            ))}
          </HotelImages>

          <HotelDetails>
            <HotelDetailsTexts>
              <h2 className="hotelTitle">{data.title}</h2>

              <HotelDesc>{data.desc}</HotelDesc>

            </HotelDetailsTexts>

            <HotelDetailsPrice>
              <h3>Perfect for a {days}-night stay!</h3>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h3>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h3>
              <button>Reserve or Book Now!</button>
            </HotelDetailsPrice>

          </HotelDetails>

          <MailList width="87%" />

          <FooterContainer>
            <Footer width="87%" />
          </FooterContainer>

        </HotelWrapper>
        {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
      </HotelContainer>)}
    </>
  )
}
