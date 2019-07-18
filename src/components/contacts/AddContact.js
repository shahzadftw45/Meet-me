import React, { Component } from "react";
import { Consumer } from "../../Context";
import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone, error } = this.state;

    if (name === "") {
      this.setState({ error: { name: "name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "phone is required" } });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
      error
    };
    dispatch({ type: "ADD_CONTACT", payload: newContact });

    this.setState({
      name: "",
      email: "",
      phone: "",
      error: ""
    });
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add Contact
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={this.onChange}
                      error={error.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={this.onChange}
                      type="email"
                      error={error.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={this.onChange}
                      error={error.phone}
                    />

                    <input
                      type="submit"
                      value="Add Contact"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
