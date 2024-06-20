'use client'

import { ChangeEvent, FormEvent, useState, FocusEvent } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import WellcomePage from "./wellcome/page";
import { UserContext, UserProvider } from "@/store/user-context";
import { useContext } from "react";
import { User } from "@/store/user-context";

export default function Home() {

  // const [user, setUser] = useState(null)

  const userCtx = useContext(UserContext);

  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ... credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email" && !emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is not valid' }));
    } else if (name === "password" && !passwordRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters long and contain both letters and numbers' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();

    if(res.ok) {
      const newUser: User = {
        email: data.user.email,
        name: data.user.name,
        lastname: data.user.lastname
      }
      console.log('newUser: ', newUser.name)
      userCtx.setUser(newUser)
      console.log('userCTX: ', userCtx.user.name)

      setToken(data.token);
      localStorage.setItem('token', data.token)
      console.log('Localstorage: ', localStorage.getItem('token'))
    } else {
      console.error('login Error: ', data.message)
    }
  }

  return (
    <>
    <UserProvider>
    { !token &&
    <main className={classes.main}>
    <div className={classes.login_animation_container}>
      <div className="backgroud-animation">
        <p>Animation</p>
      </div>
    </div>

    <div className={classes.login_form_container}>
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="email">User:</label>
              <input type="email" id="email" name="email" required
              onChange={handleChange}
              onBlur={handleBlur}/>
              {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required
              onChange={handleChange}
              onBlur={handleBlur}/>
              {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
              <button type="submit">ENTRAR</button>
          </div>
          <Link href='/wellcome'>Wellcome</Link>
        </form>
      </div>
    </div>
  </main>
    }
    {token && <WellcomePage />}
    </UserProvider>
    </>
  );
}
