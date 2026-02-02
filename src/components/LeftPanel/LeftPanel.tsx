import authImg from "../../assets/images/auth-img.jpg";
import "./LeftPanel.scss";
type Props = {
  title: string;
};

const LeftPanel = ({title}:Props) => {
    return (
        <div className="left-panel" style={{ backgroundImage: `url(${authImg})` }}>
            <p>{title}</p>
        </div>
    );
};

export default LeftPanel;