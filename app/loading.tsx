import css from "./loading.module.css";

 export default function Loading () {
  return <div className={css.wraper}><span className={css.loader}></span></div>;
};

