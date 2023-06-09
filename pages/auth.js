import React from "react";
import firebase from "firebase/clientApp";
import StyledFirebaseAuth from "components/StyledFirebaseAuth";


const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
}

function SignInScreen() {
  return (
    <div>
    <h1>Pineapple Login</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}