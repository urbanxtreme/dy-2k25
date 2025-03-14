import "./LogMe.css";
import { useState } from "react";
import { haveIsinned, helpMeTaxEvade, SinMeFather } from "../Secrets/authKarma";

const LogMeinDaddy = () => {
  const [beLogin, setbeLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [name, setName] = useState("");
  const [ssStatus, setstatus] = useState("");
  const [datsun, setNissan] = useState({});
  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState("");
  const [college, setCollege] = useState("");
  const [clgErr,setclgErr] = useState("")
  const [nameErr,setNameErr] = useState("")

  const [checkPoint,SetCheckPoint] = useState({
    name:false,
    email:false,
    phone:false,
    password:false,
    confirmPassword:false,
    college:false
  })

  const isAllTrue = (obj: { [key: string]: boolean }) => {
    return Object.values(obj).every(value => value === true);
  };

  const isSomeTrue = (obj: { [key: string]: boolean }, keys: string[]) => {
    return keys.some(key => obj[key] === true);
  };
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePhone = (phone: string) => {
    const re = /^(\+91\s?)?[0-9]{10}$/;
    return re.test(phone);
  };

  const handleCollege = (e: any) => {
    setCollege(e.target.value)
    if(college == ""){
      setclgErr("College name must be complete")
      SetCheckPoint((prev) => ({ ...prev, college: false }));
    } else{
      setclgErr("")
      SetCheckPoint((prev) => ({ ...prev, college: true }));
    }
  };

  const handlePhone = (e: any) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    if (!validatePhone(phoneValue)) {
      setPhoneError("Invalid phone number");
      SetCheckPoint((prev) => ({ ...prev, phone: false }));
    } else {
      setPhoneError("");
      SetCheckPoint((prev) => ({ ...prev, phone: true }));
    }
  };
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    if(e.target.value == ""){
      setNameErr("name incomplete")
      SetCheckPoint((prev) => ({ ...prev, name: false }));
    }else{
      setNameErr("")
      SetCheckPoint((prev) => ({ ...prev, name: true }));
    }
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email address");
      SetCheckPoint((prev) => ({ ...prev, email: false }));
    } else {
      setEmailError("");
      SetCheckPoint((prev) => ({ ...prev, email: true }));
    }
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      SetCheckPoint((prev) => ({ ...prev, password: false }));
    } else {
      setPasswordError("");
      SetCheckPoint((prev) => ({ ...prev, password: true }));
    }
  };
  const signuPCCB = (blorg: any) => {
    if (blorg.status == "success") {
      setstatus(blorg.msg);
      setNissan(blorg.data);
      setbeLogin(true);
      setstatus("Please signin to complete registration");
      localStorage.setItem("cache", JSON.stringify(blorg.data));
    } else {
      setstatus(blorg.msg);
    }
  };
  const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  const logiNCCB = (blorg: any) => {
    if (blorg.status == "success") {
      setstatus(blorg.msg);
      if (
        isEmptyObject(datsun) &&
        isEmptyObject(JSON.parse(localStorage.getItem("cache")))
      ) {
        setstatus("something went terribly wrong with signup.");
      } else {
        helpMeTaxEvade(datsun);
      }
    } else {
      setstatus(blorg.msg);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
      SetCheckPoint((prev) => ({ ...prev, confirmPassword: false }));
    } else {
      setConfirmPasswordError("");
      SetCheckPoint((prev) => ({ ...prev, confirmPassword: true }));
    }
  };

  const glogin = () => {

    if(isSomeTrue(checkPoint,["email","password"])){
      haveIsinned(email, password, logiNCCB);
    }
  };

  const gsignup = () => {
    if (password === confirmPassword && validateEmail(email)) {
      
      if(isAllTrue(checkPoint)){
        SinMeFather(email, password, signuPCCB, name, phone, college);
      }

      //   SinMeFather();
    } else {
      setstatus("Please fix the errors before signing up");
    }
  };

  return (
    <div className="pageWrap">
      <div className="log">
        <header>
          {beLogin ? (
            <>
              <p className="active">Login</p>/
              <p className="inactive" onClick={() => setbeLogin(false)}>
                Signup
              </p>
            </>
          ) : (
            <>
              <p className="inactive" onClick={() => setbeLogin(true)}>
                Login
              </p>
              /<p className="active">Signup</p>
            </>
          )}
          <p>
            {beLogin ? (
              <>
                Don't Have an Account?{" "}
                <span className="spanPP" onClick={() => setbeLogin(false)}>
                  SignUp
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="spanPP" onClick={() => setbeLogin(true)}>
                  Login
                </span>
              </>
            )}
          </p>
        </header>

        <div className="logik">
          <img src="/images/dytit.png" />

          {beLogin ? (
            <></>
          ) : (
            <div className="ioniiii">
              <input
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                autoComplete="name"
              />
                     {nameErr && <p className="error">{nameErr}</p>}
            </div>
          )}

          <div className="ioniiii">
            <input
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="ioniiii">
            <input
              placeholder="Password"
              value={password}
              type="password"
              autoComplete="password"
              onChange={handlePasswordChange}
            ></input>
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          {!beLogin && (
            <div className="ioniiii">
              <input
                placeholder="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={handleConfirmPasswordChange}
              ></input>
              {confirmPasswordError && (
                <p className="error">{confirmPasswordError}</p>
              )}
            </div>
          )}
          {!beLogin && (
            <div className="ioniiii">
              <input
                placeholder="Phone"
                value={phone}
                type="tel"
                onChange={handlePhone}
              ></input>
              {phoneError && <p className="error">{phoneError}</p>}
            </div>
          )}
          {!beLogin && (
            <div className="ioniiii">
              <input
                placeholder="College"
                value={college}
                type="text"
                onChange={handleCollege}
              ></input>
                     {clgErr && <p className="error">{clgErr}</p>}
            </div>
          )}

          <div
            className="butto"
            onClick={() => {
              beLogin ? glogin() : gsignup();
            }}
          >
            {beLogin ? "Login" : "SignUp"}
          </div>

          <p>{ssStatus && <>{ssStatus}</>}</p>
        </div>
      </div>
    </div>
  );
};

export default LogMeinDaddy;
