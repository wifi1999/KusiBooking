import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchItem0 = styled.div`
    border: 1px solid gray;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    width: 650px;
`;

const SIImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

const SIDesc = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 3;
`;
const SITitle = styled.h2`
    font-size: 20px;
    margin-top: 0px;
    color: #0071c2;
`
const SIDistance = styled.span`
    font-size: 12px;
    margin-top: -10px;
`
const SITaxiOp = styled.span`
    font-size: 12px;
    background-color: #008009;
    color: white;
    width: max-content;
    padding: 3px;
    border-radius: 5px;
`
const SISubtitle = styled.span`
    font-size: 12px;
    font-weight: bold;
`
const SIFeatures = styled.span`
    font-size: 12px;
`
const SICancelOp = styled.span`
    font-size: 12px;
    color: #008009;
    font-weight: bold;
`
const SICancelOpSubtitle = styled.span`
    font-size: 12px;
    color: #008009;
`
const SIDetails = styled.div`
    flex: 1.7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const SIRating = styled.div`
    display: flex;
    justify-content: space-between;

    & > span{
        font-weight: 500;
    }
    & button{
        background-color: #003580;
        color: white;
        padding: 5px;
        font-weight: bold;
        border: none;
    }
`
const SIDetailTexts = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const SIPrice = styled.span`
    font-size: 24px;

`
const SITaxOp = styled.span`
    font-size: 12px;
    color: gray;
`
const SICheckButton = styled.button`
    background-color: #0071c2;
    color: white;
    font-weight: bold;
    padding: 10px 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`

export const SearchItem = ({item}) => {
  return (
    <SearchItem0>
        <SIImg src={item.photos[0]}></SIImg>
        <SIDesc>
            <SITitle>{item.name}</SITitle>
            <SIDistance>{item.distance}m from center</SIDistance>
            <SITaxiOp>Free airport taxi</SITaxiOp>
            <SISubtitle>Studio Apartment with Air conditioning</SISubtitle>
            <SIFeatures>{item.desc}</SIFeatures>
            <SICancelOp>Free cancellation</SICancelOp>
            <SICancelOpSubtitle>You can cancel later, so lock in this great price today!</SICancelOpSubtitle>
        </SIDesc>
        <SIDetails>
            {item.rating && <SIRating>
               <span>Excellent</span>
               <button>{item.rating}</button>
            </SIRating>}

            <SIDetailTexts>
                <SIPrice>${item.cheapestPrice}</SIPrice>
                <SITaxOp>Includes taxes and fees</SITaxOp>

                <Link to={`/hotels/${item._id}`}>
                    <SICheckButton>See availability</SICheckButton>
                </Link>
              
            </SIDetailTexts>
        </SIDetails>
    </SearchItem0>
  );
}
