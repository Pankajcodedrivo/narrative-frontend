import "./Dashboard.scss";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
const Dashboard = () => {
  return (
    <>
      <WelcomeHeader showButton desc="All your recorded and upcoming interviews in one place." />
      <div className="tips-box">
          <div className="mb-4">
            <h3>Please follow the steps below to generate a memorial video for yourself or your loved ones.</h3>
          </div>
          <ul>
              <li>
                  <h4>Step 1:</h4>
                  <p>Take a minute to finish your profile — required fields are few, optional sections help us fine-tune your final product.</p>
              </li>
              <li>
                  <h4>Step 2:</h4>
                  <p>Take your time and complete the interview questions. We have pre-selected what works well, and you can always explore additional questions from pour database.</p>
              </li>
              <li>
                  <h4>Step 3:</h4>
                  <p>Enjoy the final video and share it with those who closet to you!</p>
              </li>
          </ul>
      </div>
      <div className="create-story">
         <h2 className="mb-4">Let’s make this easy, answer one quick question and you can begin</h2>       
         <ul>
            <li>
                <label className="checkbox-container">
                    <input
                        type="radio"
                        name="radio"
                    />
                    Creating a video for “Someone else”
                    <span className="checkmark"></span>
                </label>
            </li>
            <li>
                <label className="checkbox-container">
                    <input
                        type="radio"
                        name="radio"
                    />
                    Creating a video for “Myself”
                    <span className="checkmark"></span>
                </label>
            </li>
         </ul>
         <button type="submit" className="btn btn-secondary mw-100">Create Your Story</button>
      </div>
    </>
  );
};

export default Dashboard;