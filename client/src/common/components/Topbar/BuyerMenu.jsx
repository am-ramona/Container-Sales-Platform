import tw from "twin.macro";

const List = tw.ul`
flex items-center
hidden space-x-8
lg:flex
`;

const ListItem = tw.li`
text-primary-blue 
text-base
cursor-pointer
font-normal
`;

export default function BuyerMenu(props) {
    return(
        <List>
            <ListItem>Home</ListItem>
            <ListItem>How it works</ListItem>
            <ListItem>Container Types</ListItem>
            <ListItem>Container Uses</ListItem>
            <ListItem>Contact Us</ListItem>
        </List> 
    )
}