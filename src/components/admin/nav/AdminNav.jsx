import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firbase";
const AdminNav = () => {
  let links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Match",
      linkTo: "/admin_matches/edit_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add Players",
      linkTo: "/admin_players/add_players"
    }
  ];

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem
          button
          style={{
            color: "#ffffff",
            fontWeight: "300",
            borderBottom: "1px solid #353535"
          }}
        >
          {link.title}
        </ListItem>
      </Link>
    ));
  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("loged out");
      });
  };
  return (
    <div>
      {renderItems()}
      <ListItem
        button
        style={{
          color: "#ffffff",
          fontWeight: "300",
          borderBottom: "1px solid #353535"
        }}
        onClick={() => logoutHandler()}
      >
        Log Out
      </ListItem>
    </div>
  );
};

export default AdminNav;
