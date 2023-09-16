import { Alert } from "react-bootstrap";

function AlertMessage({ variant, message }) {
  if (message) {
    return <Alert variant={variant}>{message}</Alert>;
  }
  return null;
}

export default AlertMessage;
