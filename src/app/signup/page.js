"use client";

import { signIn } from "next-auth/react";
//hooks
import { useState,useRef } from "react";

//images
import logo from "../../images/logo.png";
import "./signup.css";

//lib
import signupFunction from "../../../lib/signupFunction";

const Signup = () => {
  // resavanje slajdera levo-desno
  const [formWrapper1Classes, setFormWrapper1Classes] = useState(
    "form-wrapper is-active"
  );
  const [formWrapper2Classes, setFormWrapper2Classes] =
    useState("form-wrapper");

  const loginButtonHandler = () => {
    setFormWrapper2Classes("form-wrapper");
    setFormWrapper1Classes("form-wrapper is-active");
  };

  const registerButtonHandler = () => {
    setFormWrapper2Classes("form-wrapper is-active");
    setFormWrapper1Classes("form-wrapper");
  };

  //login logika

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()


  //register refovi
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()
  const registerNameRef = useRef()
  const registerSurnameRef = useRef()
  const registerAdressRef = useRef()
  const registerPhoneRef = useRef()

  //register logika
  const signupActionHandler = () => {

  signupFunction({
    email:registerEmailRef.current.value,
    password:registerPasswordRef.current.value,
    name:registerNameRef.current.value,
    surname:registerSurnameRef.current.value,
    adress:registerAdressRef.current.value,
    phone:registerPhoneRef.current.value
  })

  }




  

  return (
    <div className="wrapper">
      <section class="forms-section">
        <h1 class="section-title"></h1>
        <div class="forms">
          <div class={formWrapper1Classes}>
            <button
              onClick={loginButtonHandler}
              type="button"
              class="switcher switcher-login"
            >
              Login
              <span class="underline"></span>
            </button>
            <form class="form form-login">
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div class="input-block">
                  <label for="login-email">E-mail</label>
                  <input ref={loginEmailRef} id="login-email" type="email" required />
                </div>
                <div class="input-block">
                  <label for="login-password">Password</label>
                  <input ref={loginPasswordRef} id="login-password" type="password" required />
                </div>
              </fieldset>
              <button  type="submit" class="btn-login">
                Login
              </button>
            </form>
          </div>
          <div class={formWrapper2Classes}>
            <button
              onClick={registerButtonHandler}
              type="button"
              class="switcher switcher-signup"
            >
              Sign Up
              <span class="underline"></span>
            </button>
            <form class="form form-signup">
              <fieldset className="fieldset">
                <legend>
                  Please, enter your email, password and password confirmation
                  for sign up.
                </legend>
                <div>
                  <div class="input-block">
                    <label for="signup-password-confirm">Name</label>
                    <input ref={registerNameRef} id="signup-password-confirm" type="text" required />
                  </div>

                  <div class="input-block">
                    <label for="signup-email">E-mail</label>
                    <input ref={registerEmailRef} id="signup-email" type="email" required />
                  </div>
                  <div class="input-block">
                    <label for="adress">Adress</label>
                    <input ref={registerAdressRef} id="adress" type="text" required />
                  </div>
                </div>

                <div>
                  <div class="input-block">
                    <label for="surname">Surname</label>
                    <input ref={registerSurnameRef} id="surname" type="text" required />
                  </div>
                  <div class="input-block">
                    <label for="signup-password">Password</label>
                    <input ref={registerPasswordRef} id="signup-password" type="password" required />
                  </div>

                  <div class="input-block">
                    <label for="mobile">Phone</label>
                    <input ref={registerPhoneRef} id="mobile" type="number" required />
                  </div>
                </div>
              </fieldset>
              <button onClick={signupActionHandler}  type="submit" class="btn-signup">
                signup
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
