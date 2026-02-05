import "./WelcomeHeader.scss";
type Props = {
  desc: string;
};
const WelcomeHeader = ({desc}: Props) => {
  return (
    <div className="welcome-header">
            <div>
                <h2>Welcome, User!</h2>
                <p className="mb-0">{desc}</p>  
            </div>
            <button type="button" className="btn btn-secondary mw-100">Start Your Story</button>
      </div>
  );
};

export default WelcomeHeader;