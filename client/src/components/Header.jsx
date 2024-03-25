import styled from 'styled-components';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AttractionsIcon from '@mui/icons-material/Attractions';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { DateRange } from 'react-date-range' 
import { useContext, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';

const Header0 = styled.div`
    background-color: #003588;
    color: white;
    display: flex;
    justify-content: center;
    position: relative;
`;
const HeaderContainer = styled.div`
    width: 70%;
    max-width: 1024px;
    
    ${props =>
        props.type !== "list" ?
        css`
            margin: 20px 0px 100px 0px;
        `
        : css`
            margin: 20px 0px 0px 0px;
        `
    };
`;
const HeaderList = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 50px;
    width: auto; 
    height: 35px;
`;
const HeaderListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const ActiveHeaderListItem = styled(HeaderListItem)`
    border: 1px solid white;
    padding: 5px;
    border-radius: 20px;
    width: 90px;
`;
const HeaderTitle = styled.h1`

`
const HeaderDesc = styled.p`
   margin: 20px 0px;
`
const HeaderBtn = styled.button`
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-bottom: -1px;
`
const HeaderSearch = styled.div`
    height: 20px;
    background-color: white;
    border: 3px solid #febb02;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0px;
    border-radius: 5px;
    position: absolute;
    bottom: -20px;
    width: 70%;
    max-width: 1024px;
`
const HeaderSearchItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: lightgray;
`
const HeaderSearchInput = styled.input`
    border: none;
    outline: none;
`
const HeaderSearchText = styled.span`
    color: lightgray;
    cursor: pointer;
`
const StyledDateRange = styled(DateRange)`
    position: absolute;
    top: 50px;
    z-index: 2;
`;

const Options = styled.div`
    z-index: 2;
    position: absolute;
    top: 50px;
    background-color: white;
    color: gray;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
`
const OptionItem = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 10px;
`
const OptionText = styled.span`

`
const OptionCounterButton = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #0071c2;
    color: #0071c2;
    cursor: pointer;
    background-color: white;

    &:disabled {
        cursor: not-allowed;
    }
`;

const OptionCounterNumber = styled.span`

`
const OptionCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: black;

`

export const Header = ({ type }) => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const [openDate, setOpenDate] = useState(false)
    const [destination, setDestination] = useState("")
    const [dates, setDates] = useState([{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOption = (name, operation) => {
        setOptions(prev => { 
            return {
                ...prev, [name] : operation === "i" ? options[name] + 1 : options[name] - 1 
            }
        })
    }

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options }})
        navigate("/hotels", { state: { destination, dates, options } })
    }



    return (
        <Header0>
            <HeaderContainer type={type}>

                <HeaderList>

                    <ActiveHeaderListItem>
                        <HotelIcon style={{ fontSize: "16px" }} /><span style={{ fontSize: "13px" }}>Stays</span>
                    </ActiveHeaderListItem>
                        
                    <ActiveHeaderListItem> 
                        <FlightIcon style={{ fontSize: "16px" }} /><span style={{ fontSize: "13px" }}>Flights</span>
                    </ActiveHeaderListItem>

                    <ActiveHeaderListItem>
                        <DirectionsCarFilledIcon style={{ fontSize: "16px" }} /><span style={{ fontSize: "13px" }}>Car rentals</span>
                    </ActiveHeaderListItem>

                    <ActiveHeaderListItem>
                        <AttractionsIcon style={{ fontSize: "16px" }} /><span style={{ fontSize: "13px" }}>Attractions</span>
                    </ActiveHeaderListItem>

                    <ActiveHeaderListItem>
                        <LocalTaxiIcon style={{ fontSize: "16px" }} /><span style={{ fontSize: "13px" }}>Airport taxis</span>
                    </ActiveHeaderListItem>

                </HeaderList>

                { type !== "list" && (
                    <> 
                <HeaderTitle style={{ fontSize: "25px" }}>
                    A lifetime of discounts? It's a Genius
                </HeaderTitle>

                <HeaderDesc style={{ fontSize: "13px" }}>
                    Get rewarded for your travels - unlock instant savings of 10% or more with a free kusibooking account
                </HeaderDesc>

                {!user && <HeaderBtn>Sign In / Register</HeaderBtn>}

                <HeaderSearch>

                    <HeaderSearchItem>

                        <HotelIcon />
                        <HeaderSearchInput onChange={e => setDestination(e.target.value )} placeholder="Where are you going?"></HeaderSearchInput>

                    </HeaderSearchItem>

                    <HeaderSearchItem>

                        <CalendarMonthIcon />
                        
                        <HeaderSearchText style={{ fontSize: "13px" }} onClick={() => setOpenDate(!openDate)}>
                            {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                        </HeaderSearchText>

                        { openDate && <StyledDateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            minDate={new Date()}
                        /> }

                    </HeaderSearchItem>

                    <HeaderSearchItem>

                        <PersonIcon />

                        <HeaderSearchText style={{ fontSize: "13px" }}  onClick={() => setOpenOptions(!openOptions)}>
                            {`${options.adult} adult * ${options.children} children * ${options.room} room`}
                        </HeaderSearchText>

                        { openOptions && <Options>

                            <OptionItem>

                                <OptionText>Adult</OptionText>

                                <OptionCounter>
                                    <OptionCounterButton disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")} >-</OptionCounterButton>
                                    <OptionCounterNumber>{options.adult}</OptionCounterNumber>
                                    <OptionCounterButton  onClick={() => handleOption("adult", "i")}>+</OptionCounterButton>
                                </OptionCounter>
                               
                            </OptionItem>

                            <OptionItem>

                                <OptionText>Children</OptionText>

                                <OptionCounter>
                                    <OptionCounterButton disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</OptionCounterButton>
                                    <OptionCounterNumber>{options.children}</OptionCounterNumber>
                                    <OptionCounterButton onClick={() => handleOption("children", "i")}>+</OptionCounterButton>
                                </OptionCounter>

                            </OptionItem>

                            <OptionItem>

                                <OptionText>Room</OptionText>

                                <OptionCounter>
                                    <OptionCounterButton disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</OptionCounterButton>
                                    <OptionCounterNumber>{options.room}</OptionCounterNumber>
                                    <OptionCounterButton  onClick={() => handleOption("room", "i")}>+</OptionCounterButton>
                                </OptionCounter>  

                            </OptionItem>

                        </Options> 
                        }

                    </HeaderSearchItem>

                    <HeaderSearchItem onClick={handleSearch}>
                        <HeaderBtn>Search</HeaderBtn>
                    </HeaderSearchItem>

                </HeaderSearch> 
                    </>
                )}

            </HeaderContainer>
        </Header0>
    )
}

