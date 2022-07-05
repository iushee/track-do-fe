import styles from "../styles/Home.module.css";

export default function Card(props) {
  return (
    <a href={props.url} className={styles.card}>
      <h2>{props.heading} &rarr;</h2>
      <p>{props.description}</p>
    </a>
  );
}
