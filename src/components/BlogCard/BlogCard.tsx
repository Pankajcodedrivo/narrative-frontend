import { Link } from "react-router-dom";
import "./BlogCard.scss";

type Props = {
  image: string;
  title: string;
  desc: string;
};

const BlogCard = ({image, title, desc}: Props) => {
  return (
    <Link to="/" className="blog-card">
        <figure className="blog-pic"><img className="image-area" src={image} alt="" /></figure>
        <h3 className="mb-3">{title}</h3>
        <p className="mb-4">{desc}</p>
        <button type="button" className="btn btn-outline">Read More</button>
    </Link>
  );
};

export default BlogCard;