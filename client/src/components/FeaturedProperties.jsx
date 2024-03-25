import styled from "styled-components"
import useFetch from "../hooks/useFetch"

const FP = styled.div`
    width: 70%;
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
`
const FPItem = styled.div`
    flex: 1;
    gap: 10px;
    display: flex;
    flex-direction: column;
`
const FPImg = styled.img`
    width: 70%;
    height: 170px;
    width: 170px;
`
const FPName = styled.span`
    font-weight: bold;
    font-size: 15px;
`
const FPCity = styled.span`
    font-weight: 300;
    font-size: 15px;
`
const FPPrice = styled.span`
    font-weight: 500;
    font-size: 13px;
`
const FPRating = styled.span`
    & > button {
        background-color: #003580;
        color: white;
        border: none;
        padding: 3px;
        margin-right: 10px;
        font-weight: bold;

    }
    & > span {
        font-size: 13px;   
    }
`

export const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("/hotel?featured=true&limit=4");
 
    return (
        <>
            <FP>
                {loading ? "Loading" : <>
                    {data.map(item => (
                        <FPItem key={item._id}>
                            <FPImg src={item.photos[0]}></FPImg>
                            <FPName>{item.name}</FPName>
                            <FPCity>{item.city}</FPCity>
                            <FPPrice>Starting from ${item.cheapestPrice}</FPPrice>
                            {item.rating && <FPRating>
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </FPRating>}
                        </FPItem>
                    ))}
                </>}

            </FP>
        </>

    )
}
