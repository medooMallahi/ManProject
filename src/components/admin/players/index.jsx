import React, { Component } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { firbasePlayers } from "../../../firbase";
import { firbaseLooper, reverseArray } from "../../../components/UI/misc";

export default class AdminPlayers extends Component {
  state = {
    isloading: true,
    players: []
  };

  componentDidMount() {
    firbasePlayers.once("value").then(res => {
      const players = firbaseLooper(res);
      this.setState({ isloading: false, players });
    });
  } // end of component didMount

  render() {
    console.log(this.state);
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players
                ? this.state.players.map((player, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`/admin_players/add_players/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/add_players/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </Paper>
        <div>
          <div className="admin_progress">
            {this.state.isloading ? (
              <CircularProgress thickness={5} color="secondary" />
            ) : (
              ""
            )}
          </div>
        </div>
      </AdminLayout>
    );
  }
}
