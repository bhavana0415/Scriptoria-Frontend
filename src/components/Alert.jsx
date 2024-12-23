import { useSelector, useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { hideAlert } from "../store/Features/alert/alertSlice";

const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={alert.severity} onClose={handleClose}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
