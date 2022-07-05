import Card from "../components/card";
import styles from "../styles/Home.module.css";

export default function AuthChooser() {
  return (
    <div className={styles.grid}>
      <Card
        heading="Register"
        description="New here? Go ahead and register"
        url="/auth/register"
        key="register"
      ></Card>
      <Card
        heading="Login"
        description="Hey mate! Good to see you again!"
        url="/auth/login"
        key="login"
      ></Card>
    </div>
  );
}
