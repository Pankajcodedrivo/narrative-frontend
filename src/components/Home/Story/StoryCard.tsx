type Props = {
  image: string;
  title: string;
  children: React.ReactNode;
};
import "./StoryCard.scss";
const StoryCard = ({title,image,children}: Props) => {
  return (
    <div className="row align-items-center story-row m-0">
        <div className="col-md-6 story-col p-0">
            <div className="story-img scale">
              <img src={image} alt="" />
            </div>
        </div>
        <div className="col-md-6 story-col p-0">
            <div className="story-txt">
                <h3>{title}</h3>
                <div className="story-list">
                    {children}
                </div>
                <button className="btn btn-primary">Start Your Story</button>
            </div>
        </div>
    </div>
  );
};

export default StoryCard;