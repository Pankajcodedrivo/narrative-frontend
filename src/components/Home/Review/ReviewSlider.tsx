import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import user1 from "../../../assets/images/user-1.png";
import user2 from "../../../assets/images/user-2.png";
import user3 from "../../../assets/images/user-3.png";
import user4 from "../../../assets/images/user-4.png";

const ReviewSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <Slider {...settings}>
        <ReviewCard
        image={user1}
        desc="Absolutely amazing service! Their expertise and dedication truly set them apart."
        name="Ethan Cooper"
        subtitle="Founder, Cooper Consulting"
        />
       <ReviewCard
        image={user2}
        desc="They handled everything seamlessly and delivered exceptional results!
Read more"
        name="Logan Adams"
        subtitle="Operations Manager"
        />
       <ReviewCard
        image={user3}
        desc="A wonderful experience from start to finish. Their creativity and attention to detail are unmatched!"
        name="Chloe Ramirez"
        subtitle="Marketing Head"
        />
       <ReviewCard
        image={user4}
        desc="Outstanding service! Their commitment to quality and customer satisfaction is evident."
        name="Grace Foster"
        subtitle="CEO, Foster Enterprises"
        />
        <ReviewCard
        image={user4}
        desc="Outstanding service! Their commitment to quality and customer satisfaction is evident."
        name="Grace Foster"
        subtitle="CEO, Foster Enterprises"
        />
    </Slider>
  );
};

export default ReviewSlider;