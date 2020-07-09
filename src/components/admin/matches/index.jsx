import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import { firbaseMatches } from "../../../firbase";
import { firbaseLooper, reverseArray } from "../../../components/UI/misc";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class AdminMatches extends Component {
  state = {
    isloading: true,
    matches: []
  };
  componentDidMount() {
    //fetch all the matches from the Server
    firbaseMatches.once("value").then(response => {
      const matches = firbaseLooper(response);
      this.setState({ isloading: false, matches: reverseArray(matches) });
    });
  }

  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Matche</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.matches
                ? this.state.matches.map((match, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.away}
                            <strong>-</strong>
                            {match.local}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultAway} <strong>-</strong>
                          {match.resultLocal}
                        </TableCell>
                        <TableCell>
                          {match.final === "Yes" ? (
                            <span className="matches_tag_red">Final</span>
                          ) : (
                            <span className="matches_tag_green">
                              Not played yet
                            </span>
                          )}
                        </TableCell>
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
