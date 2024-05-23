import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddProductPopup from "~/Components/Popups/AddProductPopup";
import { createProduct } from "~/Controllers";
import createAxios from "~/Configs/axios";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";
import { useDispatch } from "react-redux";
import { getStatusProductStart } from "~/Redux/actionSlice";

const cx = classNames.bind(styles);

const Toast = ({ err, mess }) => {
  switch (err) {
    case false:
      return toast.custom(
        () => <ToastNotify type="success" title="Success" desc={mess} />,
        { duration: 2000 }
      );
    case true:
      return toast.custom(
        () => <ToastNotify type="error" title="Error" desc={mess} />,
        { duration: 2000 }
      );
    default:
      return toast.custom(
        () => (
          <ToastNotify
            type="warning"
            title="Warning"
            desc="Please reload the website"
          />
        ),
        { duration: 2000 }
      );
  }
};

function Header() {
  const dispatch = useDispatch();

  const axiosInstance = createAxios();

  const [openAddProductPopup, setOpenAddProductPopup] = useState(false);

  const handleOpenAddProductPopup = () => {
    setOpenAddProductPopup(true);
  };

  const handleCloseAddProductPopup = () => {
    setOpenAddProductPopup(false);
  };

  const handleSubmitAddProduct = async (form) => {
    try {
      const res = await createProduct(axiosInstance, form);
      if (res?.error === false) {
        dispatch(getStatusProductStart());
      }
      handleCloseAddProductPopup();
      return Toast({ err: res?.error, mess: res?.message });
    } catch (err) {
      console.log("Error at Layout/Header/HandleSubmitAddProduct: ", err);
    }
  };

  return (
    <div className={cx("header-wrapper")}>
      <h1 className={cx("logo")}>LOGO</h1>
      <div className={cx("list")}>
        <Link
          to={"#!"}
          className={cx("link")}
          onClick={handleOpenAddProductPopup}
        >
          Create product
        </Link>
      </div>

      <div className={cx("popup")}>
        <div className={cx("add-product")}>
          <AddProductPopup
            openPopup={openAddProductPopup}
            handleClose={handleCloseAddProductPopup}
            handleSubmit={handleSubmitAddProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
