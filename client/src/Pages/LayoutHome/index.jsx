import classNames from "classnames/bind";
import styles from "./LayoutHome.module.scss";
import Header from "~/Components/Layout/Header";
import { Toaster } from "sonner";

const cx = classNames.bind(styles);

function LayoutHome(props) {
  return (
    <div className={cx("home-container")}>
      <Toaster
        position="top-right"
        richColors
        expand={true}
        style={{ marginRight: 28 }}
      />

      {/* Header */}
      <header className={cx("header")}>
        <Header />
      </header>
      {/* Main */}
      <section className={cx("main")}>{props?.children}</section>
      {/* Footer */}
    </div>
  );
}

export default LayoutHome;
