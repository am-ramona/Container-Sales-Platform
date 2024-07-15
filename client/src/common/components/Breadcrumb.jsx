import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import tw from "twin.macro";

const Nav = tw.nav`
text-primary-blue
pb-6
`;

const List = tw.div`
p-1
`;

const ListItem = tw.span`
text-sm md:text-15 
font-medium
`;

const LinkBlue = tw.span`
hover:text-secondary-blue
`;

const BreadcrumbIcon = tw.span`
mx-1`;

function Breadcrumb({ crumbs = [] }) {
  console.log('breadcrumb crumbs', crumbs)
  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {crumbs.map((item, i) =>
          i === crumbs.length - 1 ? (
            <ListItem key={i}>
              <span>{item.title}</span>
            </ListItem>
          ) : (
            <ListItem key={i}>
              <Link to={item.link}>
                <LinkBlue>{item.title}</LinkBlue>
              </Link>
              <BreadcrumbIcon> &#62; </BreadcrumbIcon>
            </ListItem>
          )
        )}
      </List>
    </Nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ),
};

export default Breadcrumb;

