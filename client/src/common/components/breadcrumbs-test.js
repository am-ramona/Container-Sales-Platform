
// import React, { useState } from 'react'
// // import { MdMoreHoriz } from 'react-icons/md'
// // import useBreadcrumb from './useBreadcrumb'
// // import BreadcrumbCollapser from './BreadcrumbCollapser'

// const BreadcrumbItem = ({ children, ...props }) => (
//   <li className='breadcrumb-item' {...props}>
//     {children}
//   </li>
// )

// const BreadcrumbSeparator = ({ children, ...props }) => (
//   <li className='breadcrumb-separator' {...props}>
//     {children}
//   </li>
// )

// const BreadcrumbCollapser = (props) => (
//   <li className='breadcrumb-collapser' {...props}>
//     {/* <MdMoreHoriz /> */}
//     ...
//   </li>
// )

// const useBreadcrumb = () => {
//   const [expanded, setExpanded] = useState(false)

//   const open = () => setExpanded(true)

//   return {
//     expanded,
//     open,
//   }
// }

// const Breadcrumb = ({ separator, collapse = {}, ...props }) => {
//   let children = React.Children.toArray(props.children)

//   const { expanded, open } = useBreadcrumb()

//   const { itemsBefore = 1, itemsAfter = 1, max = 4 } = collapse

//   const totalItems = children.length
//   const lastIndex = totalItems - 1

//   children = children.map((child, index) => (
//     <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
//   ))

//   children = children.reduce((acc, child, index) => {
//     const notLast = index < lastIndex
//     if (notLast) {
//       acc.push(
//         child,
//         <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
//           {separator}
//         </BreadcrumbSeparator>,
//       )
//     } else {
//       acc.push(child)
//     }
//     return acc
//   }, [])

//   if (!expanded || totalItems <= max) {
//     children = [
//       ...children.slice(0, itemsBefore),
//       <BreadcrumbCollapser
//         title='Expand'
//         key='collapsed-seperator'
//         onClick={open}
//       />,
//       ...children.slice(totalItems - itemsAfter, totalItems),
//     ]
//   }

//   return <ol>{children}</ol>
// }

// export default Breadcrumb

// import React from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import tw from "twin.macro";

// const Nav = tw.nav`
// text-primary-blue
// pb-6
// `;

// const List = tw.div`
// p-1
// `;

// const ListItem = tw.span`
// text-sm md:text-15 
// font-medium
// `;

// const LinkBlue = tw.span`
// hover:text-secondary-blue
// `;

// const BreadcrumbIcon = tw.span`
// mx-1`;

// const Breadcrumbs = ({ crumbs = {} }) => {
  // Don't render a single breadcrumb.
  // const map = new Map(Object.entries(crumbs));
  // for (let [key, value] of map) {
  //   console.log("map : " + key + ' = ' + value)
  //   console.log("typeof key : " + typeof key)
  //   console.log("typeof value : " + typeof value)
  //   console.log('breadcrumb', value + " > ")
  // }
  // console.log('map', map[0])
  // if (map.size <= 1) {
  //   return null;
  // }
  // for (let [key, value] of map) {
//   Object.keys(crumbs).map(function (key, index) {
  // return (
  //   Object.values(crumbs).map(function (key, value, index) {
  //     console.log('crumbs key', key)
  //     console.log('crumbs value', value)
  //     return key + " > "
  //   })
  // )
//     return (
// //       <Nav aria-label="Breadcrumb">
// //         {key}
// "tralalas"
// //       </Nav>
//     );
//   })
// }
// }

{/* {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>
            {name}
          </span>
        ) : (
          <Link key={key} to={path}>
            {name}
          </Link>
        )
      )} */}

// export default Breadcrumbs;