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
        <div className="benefit-pic scale">
            <img src={image} alt="" />
            <a href="https://youtu.be/zGRPON4FcBk?si=_BuCMvCJ1YEOvcq2"  data-fancybox className="play-btn"><img src={playBtn} alt="" /></a>
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