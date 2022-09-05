import React, { Component } from "react";

export class NotFoundPage extends Component {
  render() {
    return (
      <div className="container">
        <div className={"not__found__container"}>
          <div>
            <h1 className={"contentHeader"}>404 Page Not Found</h1>
            <p className={"contentParagraph"}>
              Might be invalid accountID or TransactionID or Hash.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
