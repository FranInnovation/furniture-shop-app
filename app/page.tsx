import Image from "next/image";
import classes from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.login_animation_container}>
        <div className="backgroud-animation">
          <p>Animation</p>
        </div>
      </div>

      <div className={classes.login_form_container}>
        <div className="login-form">
          <h1>Login</h1>
          <form action="">
            <div className="form-group">
                <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <div className="form-group">
                <button type="submit">ENTRAR</button>
            </div>
            <Link href='/wellcome'>Wellcome</Link>
          </form>
        </div>
      </div>
    </main>
  );
}
