type Props = {
  image: string;
  title: string;
  desc: string;
};
import "./FeatureCard.scss";
const FeatureCard = ({title,desc,image}: Props) => {
  return (
    <div className="feature-card">
        <h3>{title}</h3>
        <div className="ai-image scale"><img src={image} alt="" /></div>
        <p className="mb-0">
          {desc}
        </p>
      </div>
  );
};

export default FeatureCard;