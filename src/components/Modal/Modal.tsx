import { Link } from "react-router-dom";
import "./modal.scss";
import SubHeader from "../SubHeader/SubHeader";

const Modal = () => {
    return (
        <div className="modal-wrapper">
            <SubHeader title="Sign up successful! Welcome aboard." desc="Your account has been created successfully. Let’s get started!" />
            <Link to="/" className="btn btn-secondary">Go To Dashboard</Link>
        </div>
    );
};

export default Modal;