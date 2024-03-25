import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import { SearchItem } from '../components/SearchItem'
import useFetch from '../hooks/useFetch'

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const ListWrapper = styled.div`
  width: 80%;
  max-width: 1024px;
  display: flex;
  gap: 20px;
  flex: 0.9;
`
const ListSearch = styled.div`
  flex: 1;
  background-color: #febb02;
  padding: 5px;
  border-radius: 10px;
  position: sticky;
  top: 10px;
  height: max-content;
`
const ListResult = styled.div`
  flex: 3;
`
const LSTitle = styled.h1`
  font-size: 15px;
  color: #555;
  margin-bottom: 10px;
`
const LSItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;

  & > label{
    font-size: 12px;
  }

  & > input {
    height: 20px;
    border: none;
    padding: 5px;
  }

  & > span {
    height: 20px;
    border: none;
    padding: 5px;
    background-color: white;
    align-items: center;
    display: flex;
    cursor: pointer;
  }

  & > button{
    padding: 10px;
    background-color: #0071c2;
    color: white;
    border: none;
    width: 100%;
    font-weight: 500;
    cursor: pointer;
  }
`
const Destination = styled.label`
  
`
const Input = styled.input`
  
`
const Options = styled.label`
  
`
const LSOptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
  font-size: 10px;
`
const LSOptionText = styled.span`
  font-size: 12px;
`
const LSOptionInput = styled.input`
  width: 50px;
`
const LSOptions = styled.div`
  padding: 10px;
`

export const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, reFetch } = useFetch(`/hotel?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <ListContainer>
        <ListWrapper>
          <ListSearch>
            <LSTitle>Search</LSTitle>

            <LSItem>
              <Destination>Destination</Destination>
              <Input placeholder={`${destination}`}></Input>
            </LSItem>

            <LSItem>
              <Destination>Check-in Date</Destination>
              <span onClick={() => setOpenDate(!openDate)} style={{ fontSize: "14px" }}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
             { openDate && (<DateRange onChange={item => setDates([item.selection])} minDate={new Date()} ranges={dates} />) }
            
            </LSItem>

            <LSItem>
              <Options>Options</Options>
              <LSOptions>
                <LSOptionItem>
                  <LSOptionText>
                    Min price <small>per night</small>
                  </LSOptionText>
                  <LSOptionInput type="number" onChange={e => setMin(e.target.value)}></LSOptionInput>
                </LSOptionItem>

                <LSOptionItem>
                  <LSOptionText>
                    Max price <small>per night</small>
                  </LSOptionText>
                  <LSOptionInput type="number" onChange={e => setMax(e.target.value)}></LSOptionInput>
                </LSOptionItem>

                <LSOptionItem>
                  <LSOptionText>
                    Adult 
                  </LSOptionText>
                  <LSOptionInput type="number" min={1} placeholder={options.adult}></LSOptionInput>
                </LSOptionItem>

                <LSOptionItem>
                  <LSOptionText>
                    Children
                  </LSOptionText>
                  <LSOptionInput type="number" min={0} placeholder={options.children}></LSOptionInput>
                </LSOptionItem>

                <LSOptionItem>
                  <LSOptionText>
                    Room
                  </LSOptionText>
                  <LSOptionInput type="number" min={1} placeholder={options.room}></LSOptionInput>
                </LSOptionItem>
              </LSOptions>

              <button onClick={handleClick}>Search</button>
            
            </LSItem>

          </ListSearch>
          <ListResult>

            {loading ? "loading" : (<>
              {data.map(item => (
                  <SearchItem item={item} key={item._id}/>
              ))}
            </>)}

          </ListResult>
        </ListWrapper>
      </ListContainer>
    </div>
  )
}
