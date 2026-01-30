import ReviewSlider from "../../components/Review/ReviewSlider";
import google from "../../assets/images/google.png";
import SubHeader from "../../components/SubHeader/SubHeader";
import "./ReviewCard.scss";
const ReviewSection = () => {
  return (
    <section className="common-gap back">
        <div className="container">
          <div className="cmn-top">
            <SubHeader title="Stories from our users." desc="Hear how people are preserving memories and turning moments into lasting stories." />
            <span><img src={google} alt="" /></span>
          </div>
          <ReviewSlider />
        </div>
      </section>
  );
};

export default ReviewSection;