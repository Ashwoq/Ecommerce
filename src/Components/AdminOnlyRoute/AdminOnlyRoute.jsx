import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import ErrorPage from "../../layouts/ErrorPage";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "ashwoq00786@gmail.com") {
    return children;
  }
  return (
    <>
      <ErrorPage></ErrorPage>
    </>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "ashwoq00786@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
