import styles from "./FooterItem.module.css";

export default function FooterItem(props) {
  return (
    <div className={styles["footer-item"]}>
      <h2>{props.item.title}</h2>
      {props.item.links.map((x) => {
        return (
          <a
            key={x}
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {x}
          </a>
        );
      })}
    </div>
  );
}
