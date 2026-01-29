import playBtn from "../../../assets/images/play-btn.svg";
type Props = {
  image: string;
  title: string;
  desc: string;
};
import "./BenefitCard.scss";
const BenefitCard = ({title,desc,image}: Props) => {
  return (
    <div className="benefit-innr">
        <div className="benefit-pic">
            <img src={image} alt="" />
            <button type="button" className="play-btn"><img src={playBtn} alt="" /></button>
            <p>Duration - 2:5 Mins.</p>
        </div>
        <div className="benefit-content">
            <h3>{title}</h3>
            <p>{desc}</p>
            <button type="button" className="btn btn-outline">Start Your Story</button>
        </div>
    </div>
  );
};

export default BenefitCard;