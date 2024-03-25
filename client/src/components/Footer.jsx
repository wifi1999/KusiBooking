import styled from "styled-components"

const Footer0 = styled.div`
    width: 70%;
    width: 1000px;
    font-size: 12px;
`
const FLists = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    margin-left: 130px;
`
const FList = styled.ul`
    list-style: none;
    padding: 0;
`
const FListItem = styled.li`
    margin-bottom: 10px;
    color: #003588;
    cursor: pointer;
`
const FText = styled.div`
    margin-left: 130px;
`
const FooterContainer = styled.div`
    width: ${(props) => props.width || "100%"};
`

export const Footer = ({ width }) => {
  return (
    <FooterContainer>
        <Footer0>
            <FLists>
                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>

                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>

                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>

                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>

                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>

                <FList>
                    <FListItem>Countries</FListItem>
                    <FListItem>Regions</FListItem>
                    <FListItem>Cities</FListItem>
                    <FListItem>District</FListItem>
                    <FListItem>Airports</FListItem>
                    <FListItem>Hotels</FListItem>
                </FList>
            </FLists>
            <FText>Copyright @ 2024 Kusibooking.</FText>
        </Footer0>
    </FooterContainer>
  )
}
