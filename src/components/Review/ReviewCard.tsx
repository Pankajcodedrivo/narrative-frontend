import googleLogo from "../../assets/images/google-logo.svg";
import rating from "../../assets/images/rating.svg";
type Props = {
  image: string;
  desc: string;
  name: string;
  subtitle: string;
};
import "./ReviewCard.scss";
const ReviewCard = ({name,subtitle,desc,image}: Props) => {
  return (
    <div className="review-card">
        <span className="rating"><img src={rating} alt="" /></span>
        <div className="review-otr">
            <div className="review-pic">
                <img className="img-cover" src={image} alt="" />
            </div>
            <div className="review-txt">
                <h4>{name}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
        <p className="desc">{desc}</p>
        <span className="posted">Posted on</span>
        <span><img src={googleLogo} alt="" /></span>
    </div>
  );
};

export default ReviewCard;