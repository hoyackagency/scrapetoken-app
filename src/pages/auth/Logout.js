import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../redux/actions";

class Logout extends Component {
  /**
   * Redirect to login
   */
  componentDidMount = () => {
    // emit the event
    this.props.logoutUser(this.props.history);
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default compose(
  withRouter,
  connect(null, { logoutUser })
)(Logout);
// export default withRouter(
//     connect(
//         null,
//         { logoutUser }
//     )(Logout)
// );
