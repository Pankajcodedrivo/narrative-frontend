import "./WelcomeHeader.scss";
type Props = {
  desc: string;
  showButton?: boolean;
  name?: string;
};
const WelcomeHeader = ({ desc, showButton = false, name = "User" }: Props) => {
  return (
    <div className="welcome-header">
            <div>
                <h2>Welcome, {name}!</h2>
                <p className="mb-0">{desc}</p>  
            </div>
            {showButton && <button type="button" className="btn btn-secondary mw-100">Start Your Story</button>}
      </div>
  );
};

export default WelcomeHeader;
