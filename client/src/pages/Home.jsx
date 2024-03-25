import { Navbar } from "../components/Navbar"
import { Header } from "../components/Header"
import styled from "styled-components"
import { Featured } from "../components/Featured"
import { PropertyList} from "../components/PropertyList"
import { FeaturedProperties } from "../components/FeaturedProperties"
import { MailList } from "../components/MailList"
import { Footer } from "../components/Footer"

const HomeContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`
const HomeTitle = styled.h1`
  width: 1024px;
  font-size: 20px;
  width: 70%; /* Adjust as needed */
  max-width: 1024px; /* Set maximum width if necessary */
  font-size: 20px;

`
export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <HomeContainer>
        <Featured />
        <HomeTitle style={{ fontSize: "17px", marginBottom: "-10px" }}>Browse by property type</HomeTitle>
        <PropertyList />
        <HomeTitle style={{ fontSize: "17px", marginBottom: "-10px" }}>Home guests love</HomeTitle>
        <FeaturedProperties />

        <MailList />
        <Footer />
      </HomeContainer>
    </div>
  )
}
