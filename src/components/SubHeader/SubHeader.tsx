type Props = {
  title: string;
  desc: string;
};
import "./SubHeader.scss";
const SubHeader = ({title,desc}: Props) => {
  return (
    <div className="cmn-hdr">
        <h2>{title}</h2>
        <p>{desc}</p>
    </div>
  );
};

export default SubHeader;