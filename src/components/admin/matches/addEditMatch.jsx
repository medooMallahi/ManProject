import React, { Component } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import FormField from "../../UI/fomFields";
import { validate, firbaseLooper } from "../../UI/misc";
import { firbaseTeams, db, firbaseMatches } from "../../../firbase";
export default class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formdata: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, //end of date
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "select a team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "team results",
          name: "select_result",
          type: "select",
          options: [
            { key: "w", value: "w" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "n/a", value: "n/a" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, //end of result

      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played",
          name: "select_played",
          type: "select",
          options: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, //end of final
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Local Result",
          name: "result_local_input",
          type: "text",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "select a team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Local Result",
          name: "result_local_input",
          type: "text",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      }
    } // end of form data
  }; // end of state
  successForm = message => {
    this.setState({ formSuccess: message });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true; // must be true at first
    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    this.state.teams.forEach(team => {
      if ((team.shortName = dataToSubmit.local)) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if ((team.shortName = dataToSubmit.away)) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });
    if (formIsValid) {
      if (this.state.formType === "Edit Match") {
        db.ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(response => {
            this.successForm("Updated Correctly");
          })
          .catch(err => {
            this.setState({ formError: true });
          });
      } else {
        // here we will add a match
        firbaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_matches");
          })
          .catch(error => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  }; // end of  submitForm method

  updateForm = element => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };
    newElement.value = element.event.target.value;
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata, formError: false });
  }; // end of  updateForm method

  updateFields = (match, teamOptions, teams, type, matchId) => {
    const newFormdata = { ...this.state.formdata };
    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      } // end of the first if
      if (key === "local" || key === "away") {
        newFormdata[key].config.options = teamOptions;
      } // end of the second if
    }
    this.setState({ matchId, formType: type, formdata: newFormdata, teams });
  };
  componentDidMount() {
    const matchId = this.props.match.params.id;

    const getTeams = (match, type) => {
      firbaseTeams.once("value").then(response => {
        const teams = firbaseLooper(response);
        const teamOptions = [];
        response.forEach(team => {
          teamOptions.push({
            key: team.val().shortName,
            value: team.val().shortName
          }); // end of push method
        }); // end of for each
        this.updateFields(match, teamOptions, teams, type, matchId);
      }); // end of then method
    }; // end of getTeams method

    if (!matchId) {
      getTeams(false, "Add Match");
    } else {
      db.ref(`matches/${matchId}`)
        .once("value")
        .then(response => {
          const match = response.val();
          getTeams(match, "Edit Match");
        });
    } // end of else
  } // end of  componentDidMoun  method

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"date"}
                formdata={this.state.formdata.date}
                change={element => this.updateForm(element)}
              />

              {/* start of  select team wrapper */}
              <div className="select_team_layout">
                <div className="label_inputs">local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"local"}
                      formdata={this.state.formdata.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultLocal"}
                      formdata={this.state.formdata.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              {/* end of  select team wrapper */}

              {/* start of  select team wrapper */}
              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"away"}
                      formdata={this.state.formdata.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultAway"}
                      formdata={this.state.formdata.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              {/* end of  select team wrapper */}

              <div className="split_fields">
                <FormField
                  id={"referee"}
                  formdata={this.state.formdata.referee}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"stadium"}
                  formdata={this.state.formdata.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields last">
                <FormField
                  id={"result"}
                  formdata={this.state.formdata.result}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"final"}
                  formdata={this.state.formdata.final}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">something is wrong</div>
              ) : (
                ""
              )}
              <div className="admin_submit">
                <button
                  onClick={event => {
                    this.submitForm(event);
                  }}
                >
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  } // end of render method
} // end of class
