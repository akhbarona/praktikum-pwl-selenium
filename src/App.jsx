import { useState } from "react";

const App = () => {
  const [input,setInput] = useState({
    name: "",
    username: "",
    password: "",
    re_password: "",
    isValidUsername: false,
    isValidPassword: false,
    isValidRepassword: false,
    isValidMatchRepassword: false,
    usernameDefault:"akhbarona"
  })


  const namehandler = e => {
      setInput({
        ...input,
        name: e.target.value
      })
  }
  const usernamehandler = (e) => {
    if(e.target.value === "" ){
      setInput({
        ...input,
        username: e.target.value,
        isValidUsername: false
      })
    }else {
      if( e.target.value === input.usernameDefault){
        setInput({
          ...input,
          username: e.target.value,
          isValidUsername: false
        })
      }else{
        setInput({
          ...input,
          username: e.target.value,
          isValidUsername: true
        })
      }
    }
  }


  const passwordhandler = e => {
      if(e.target.value === ""){
        setInput({
          ...input,
          password: e.target.value,
          isValidPassword: false,
          
        })
      }else{
        if(e.target.value.length < 8){
          setInput({
            ...input,
            password: e.target.value,
            isValidPassword: false
          })
        }else{
          setInput({
            ...input,
            password: e.target.value,
            isValidPassword: !input.isValidPassword
          })
        }
      }
  }
  const repasswordhandler = e => {
    if(e.target.value === ""){
      setInput({
        ...input,
        re_password: e.target.value,
        isValidRepassword: false
      })
    }else{
      if(e.target.value.length < 8){
        setInput({
          ...input,
          re_password: e.target.value,
          isValidRepassword: false,
          isValidMatchRepassword: !input.isValidMatchRepassword
        })
      }else{
        if(e.target.value !== input.password){
          setInput({
            ...input,
            re_password: e.target.value,
            isValidMatchRepassword: false
          })
        }else{
          setInput({
            ...input,
            re_password: e.target.value,
            isValidRepassword: !input.isValidRepassword,
            isValidMatchRepassword: input.isValidMatchRepassword
          })
        }
      }
    }
  }
 
  const handleSubmit = e => {
    e.preventDefault();
    const valid = document.getElementById("valid")
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const re_password = document.getElementById("repassword");
    
    const nameValue = input.name.trim();
    const usernameValue = input.username.trim();
    const passwordValue = input.password.trim();
    const re_passwordValue = input.re_password.trim();

     //cek field nama
    if (nameValue === "")  {
      setErrorFor(name, "field nama tidak boleh kosong");
    } else {
      setSuccessFor(name);
    }

    //cek field username
    if (usernameValue === "" ) {
      setErrorFor(username, "field username tidak boleh kosong");
    } else{
      if(usernameValue === input.usernameDefault){
        setErrorFor(username, "Username sudah dipakai");
      }else{
          setSuccessFor(username);
      }
    }
    // console.log(input.isValidUsername)

    //cek password
    if (passwordValue === "") {
      setErrorFor(password, "field password tidak boleh kosong");
    } else {
     
      if(input.isValidPassword){
        setSuccessFor(password);
      }else{
        setErrorFor(password, "Password harus 8 karakter atau lebih");
      }
    }
    // console.log(input.isValidPassword)

    //cek re-password
    if (re_passwordValue === "") {
      setErrorFor(re_password, "field re-password tidak boleh kosong");
    } else {
      if(input.isValidRepassword){
        setSuccessFor(re_password);
      }else{
        if(input.isValidMatchRepassword === false){
          setErrorFor(re_password, "re-password tidak sama");
        }else{
          setErrorFor(re_password, "re-Password harus 8 karakter atau lebih");

        }
      }
    }
    // console.log(input.isValidRepassword)
    if(input.name === "" || input.isValidUsername === false|| input.isValidPassword === false || input.isValidRepassword === false || input.username ==="" || input.password === "" || input.re_password === ""){
      setError(valid)
    }else if(input.name !== "" && input.isValidUsername === true && input.isValidPassword === true && input.isValidRepassword === true && input.username !=="" && input.password !== "" && input.re_password !== ""){
      setSuccess(valid,"Berhasil Registrasi")
      setInput({
        ...input,
        name: "",
        username: "",
        password: "",
        re_password: ""
      })
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}
function setSuccess(sukses,message) {
    const formControl = sukses.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "sukses success";
    small.innerText = message

}
function setError(gagal) {
    const formControl = gagal.parentElement;
    formControl.className = "sukses error";
}
  return (
    <div className="container">
      <div className="header">
        <h2>Registrasi</h2>
      </div>
      <form id="form" className="form" onSubmit={handleSubmit}>
      <div className="sukses">
        <small id="valid" >Succes message</small>
      </div>
        <div className="form-control">
          <input type="text" placeholder="Nama" id="name" value={input.name}  onChange={namehandler} />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>
        <div className="form-control">
          <input type="text" placeholder="Username" id="username" value={input.username}  onChange={usernamehandler} />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>
        <div className="form-control">
          <input type="password" placeholder="Password" id="password" value={input.password}  onChange={passwordhandler} />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>
        <div className="form-control">
          <input type="password" placeholder="Re-Password" id="repassword" value={input.re_password} onChange={repasswordhandler} />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>
        <button type="submit" name="register">Register</button>
      </form>
    </div>
  );
}

export default App;
