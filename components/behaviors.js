import Head from "next/head";
import Image from "next/image";
import Card from "./card";
import styles from "../styles/Home.module.css";

export default function BehaviorCards(props) {
  return (
    <div className={styles.grid}>
      {props.data.map((behavior, i) => (
        <Card
          heading={behavior.name}
          description={behavior.description || "Skill up in 👆"}
          key={i}
          url={`/behaviors/${behavior.id}`}
        />
      ))}
    </div>
  );
}
