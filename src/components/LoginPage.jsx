import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [navigate,setNavigate] = useState(false)
  const [focused, setFocused] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data===null){
       user_data = []
    }
    const user = user_data.find((user) => user.email === values.email);
    if (user) {
      if (user.password === values.password) {
      const new_user_data = user_data.map((old_user)=>{
        if (old_user.id===user.id){
          old_user.signin = true
        }
        else{
          old_user.signin = false
        }
        return old_user
      })
      localStorage.setItem("user_data",JSON.stringify(new_user_data));
      setNavigate(true)

      } else {
        passwordRef.current.setCustomValidity("Incorrect Password");
       
      }
     
    } else {
      emailRef.current.setCustomValidity("User not found");
     
    }    
  };

  if (emailRef.current!==null){
    emailRef.current.setCustomValidity("")
  }

  if (passwordRef.current!==null){
    passwordRef.current.setCustomValidity("")
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="formInput">
          <label>Email</label>
          <input
            {...inputs[0]}
            value={values[0]}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            ref={emailRef}
          />
          <span>Invalid Email</span>
        </div>
        <div className="formInput">
          <label>Password</label>
          <input
            {...inputs[1]}
            value={values[1]}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            ref={passwordRef}
          />
          <span>Incorrect Password</span>
        </div>
        <button>Submit</button>
        <p>
          Not yet registered? <Link to={"/register"}>Click here</Link>
        </p>
        {navigate && <Navigate to={"/home"} replace/>}
      </form>
    </div>
  );
};

export default LoginPage;