import styled from "styled-components"
import useFetch from "../hooks/useFetch"

const Featured0 = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    gap: 20px;
    z-index: 1;
    margin-bottom: -90px;
`
const FeaturedItem = styled.div`
    position: relative;
    color: white;
    border-radius: 10px;
    overflow: hidden;
    height: 250px;
`
const FeaturedImg = styled.img`
    width: 100%;
    object-fit: cover;
    height: 180px;
`
const FeaturedTitles = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
`
const Desc = styled.h1`
    font-size: 25px;
    margin-bottom: 5px;
`
const Desc2 = styled.h2`
    font-size: 21px;
    margin-top: 5px;
    margin-bottom: 75px;
`

export const Featured = () => {
    const { data, loading, error } = useFetch("/hotel/countByCity?cities=berlin,madrid,london")

    return (
        <Featured0>
            {loading ? "Loading please wait" : <> <FeaturedItem>
                <FeaturedImg src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="></FeaturedImg>
                <FeaturedTitles>
                    <Desc>Berlin</Desc>
                    <Desc2>{data[0]} properties</Desc2>
                </FeaturedTitles>
            </FeaturedItem>

                <FeaturedItem>
                    <FeaturedImg src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o"></FeaturedImg>
                    <FeaturedTitles>
                        <Desc>Madrid</Desc>
                        <Desc2>{data[1]} properties</Desc2>
                    </FeaturedTitles>
                </FeaturedItem>

                <FeaturedItem>
                    <FeaturedImg src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o"></FeaturedImg>
                    <FeaturedTitles>

                        <Desc>London</Desc>
                        <Desc2>{data[2]} properties</Desc2>

                    </FeaturedTitles>
                </FeaturedItem> </>}
        </Featured0>
    )
}
