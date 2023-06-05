import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/clientApp";


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