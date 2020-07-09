import React, { Component } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import FormField from "../../UI/fomFields";
import { validate } from "../../UI/misc";
import { db, firbasePlayers, firebase } from "../../../firbase";
import Fileuploader from "../../UI/fileuploader";
export default class AddEditPlayer extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player  name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, //end of name
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player last name",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }, //end of lastname
      number: {
        element: "input",
        value: "",
        config: {
          label: "player number",
          name: "number_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "keeper", value: "keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfiled", value: "Midfiled" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };
  updateFields = (player, playerId, type, defaultImg) => {
    const newFormdata = { ...this.state.formdata };
    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType: type,
      formdata: newFormdata
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({ formType: "Add player" });
      //add player
    } else {
      //edit player
      db.ref(`players/${playerId}`)
        .once("value")
        .then(res => {
          const playerData = res.val();
          console.log(playerData);
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit player", url);
            })
            .catch(err => {
              this.updateFields(
                { ...playerData, image: "" },
                playerId,
                "Edit player",
                ""
              );
            });
        });
    }
  }
  successForm = message => {
    this.setState({ formSuccess: message });
    setTimeout(() => {
      this.setState({ formSuccess: message });
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

    if (formIsValid) {
      if (this.state.formType === "Edit player") {
        //edit player
        db.ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(res => {
            this.successForm("updated correctly");
          });
      } else {
        firbasePlayers.push(dataToSubmit).then(() => {
          this.props.history.push("/admin_players");
        });
      }
    } else {
      this.setState({ formError: true });
    }
  }; // end of  submitForm method

  updateForm = (element, content = "") => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      // so it's an image
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata, formError: false });
  }; // end of  updateForm method

  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;
    this.setState({ defaultImg: "", formdata: newFormdata });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form
              onSubmit={event => {
                this.submitForm(event);
              }}
            >
              <Fileuploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formdata.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"lastname"}
                formdata={this.state.formdata.lastname}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"number"}
                formdata={this.state.formdata.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"position"}
                formdata={this.state.formdata.position}
                change={element => this.updateForm(element)}
              />
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
  }
}
