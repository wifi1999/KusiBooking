import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Reserve0 = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.418);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const RContainer = styled.div`
    background-color: white;
    padding: 20px;
    position: relative;
`
const RItem = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
    padding: 20px;
`
const RItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const RTitle = styled.div`
    font-weight: 500;
`
const RDesc = styled.div`
    font-size: 300;
`
const RMax = styled.div`
    font-size: 12px;
`
const RPrice = styled.div`
    font-weight: 500;
`
const Room = styled.div`
    display: flex;
    flex-direction: column;
`
const RButton = styled.button`
    border: none;
    padding: 10px 20px;
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
`
const RSelectRooms = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 8px;
    color: gray;
`

export const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`/hotel/room/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        let dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return dates
    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => alldates.includes(new Date(date).getTime()))
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }

    const navigate = useNavigate()

    const handleClick = async() => {
        try{
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/room/availability/${roomId}`, { dates: alldates })
                return res.data
            }))
            setOpen(false)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Reserve0>
            <RContainer>
                <FontAwesomeIcon icon={faTimesCircle} className="rClose" onClick={() => setOpen(false)} style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} />
                <span>Select your rooms:</span>
                {console.log(data)}
                {data.map((item, index) => (
                    <RItem key={index}>
                        <RItemInfo>
                            <RTitle>{item.title}</RTitle>
                            <RDesc>{item.desc}</RDesc>
                            <RMax>Max people: <b>{item.maxPeople}</b></RMax>
                            <RPrice>{item.price}</RPrice>
                        </RItemInfo>

                        <RSelectRooms>
                            {item.roomNumbers.map((roomNumber, index) => (
                                <Room key={index}>
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </Room>
                            ))}
                        </RSelectRooms>

                        

                    </RItem>
                ))}
                <RButton onClick={handleClick}>Reserve Now!</RButton>
            </RContainer>
        </Reserve0>
    )
}
