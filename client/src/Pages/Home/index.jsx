import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  Slide,
} from "@mui/material";
import createAxios from "~/Configs/axios";
import {
  editProductById,
  getAllProduct,
  removeProductById,
} from "~/Controllers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatusProductStart,
  getStatusProductSuccess,
} from "~/Redux/actionSlice";
import styled from "@emotion/styled";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";
import EditPopupProduct from "~/Components/Popups/EditProductPopup";

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

function Home() {
  const dispatch = useDispatch();
  const axiosInstance = createAxios();

  const [listProduct, setListProduct] = useState(null);
  const [removePopupProduct, setRemovePopupProduct] = useState(false);
  const [editProductPopup, setEditProductPopup] = useState(false);

  const [formRemove, setFormRemove] = useState(null);

  const statusProduct = useSelector((state) => state.action.statusProduct);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (statusProduct.start === true) {
      getAllProducts();
      dispatch(getStatusProductSuccess());
    }
  }, [statusProduct.start]);

  const openRemovePopupProduct = (form) => {
    setRemovePopupProduct(true);
    setFormRemove(form);
  };

  const hideRemovePopupProduct = () => {
    setRemovePopupProduct(false);
    setFormRemove(null);
  };

  const getAllProducts = async () => {
    try {
      const res = await getAllProduct(axiosInstance);
      setListProduct(res?.data);
    } catch (err) {
      console.log("Error at get all product: ", err);
    }
  };

  const handleRemoveProduct = async () => {
    try {
      const res = await removeProductById(axiosInstance, formRemove);
      if (res?.error === false) {
        dispatch(getStatusProductStart());
      }
      hideRemovePopupProduct();
      Toast({ err: res?.error, mess: res?.message });
      setFormRemove(null);
    } catch (err) {
      console.log("Error at remove product by id: ", err);
    }
  };

  const openEditProductPopup = (form) => {
    setEditProductPopup(true);
    setFormRemove(form);
  };

  const closeEditProductPopup = () => {
    setEditProductPopup(false);
    setFormRemove(null);
  };

  const handleSubmitEditProduct = async (form) => {
    try {
      const res = await editProductById(axiosInstance, form);
      if (res?.error === false) {
        dispatch(getStatusProductStart());
      }
      closeEditProductPopup();
      Toast({ err: res?.error, mess: res?.message });
      setFormRemove(null);
    } catch (err) {
      console.log("Error at handleSubmitEditProduct: ", err);
    }
  };

  return (
    <div className={cx("home-wrapper")}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "1.6rem" }}
                width={"5%"}
                align="left"
              ></TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"12%"} align="left">
                Id
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"20%"} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"40%"} align="left">
                Description
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"15%"} align="left">
                Price
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  userSelect: "none",
                }}
              >
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  component="th"
                  scope="row"
                  align="center"
                  width={"5%"}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  component="th"
                  scope="row"
                  align="left"
                  width={"12%"}
                >
                  {row?.id}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"20%"}
                  align="left"
                >
                  {row?.name}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"40%"}
                  align="left"
                >
                  {row?.desc}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"15%"}
                  align="left"
                >
                  {row?.price}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.6rem",
                    display: "flex",
                    columnGap: "10px",
                  }}
                  align="center"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => openEditProductPopup(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => openRemovePopupProduct(row)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={cx("popups")}>
        {/* Del popup product */}
        <div className={cx("del_popup-product")}>
          <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={removePopupProduct}
            TransitionComponent={Transition}
            keepMounted
            onClose={hideRemovePopupProduct}
            aria-describedby="alert-dialog-slide-description"
          >
            <div className={cx("themeLoginPopup")}>
              <h2 className={cx("heading_popup")}>Delete product</h2>
              <p className={cx("desc_popup")}>
                Are you sure delete product with{" "}
                <span className={cx("bold")}>ID is {formRemove?.id}</span>
              </p>

              <div className={cx("list-act_popup")}>
                <div
                  className={cx("act_popup", "cancle_popup")}
                  onClick={hideRemovePopupProduct}
                >
                  Cancle
                </div>
                <div
                  className={cx("act_popup", "submit_popup")}
                  onClick={handleRemoveProduct}
                >
                  Remove
                </div>
              </div>
            </div>
          </Dialog>
        </div>
        {/* Edit popup product */}
        <div className={cx("edit_popup-product")}>
          {editProductPopup && (
            <EditPopupProduct
              form={formRemove}
              openPopup={editProductPopup}
              handleClose={closeEditProductPopup}
              handleSubmit={handleSubmitEditProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
