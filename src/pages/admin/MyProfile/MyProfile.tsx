import { useState } from "react";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import profileImg from "../../../assets/images/profile-lg.png"
import edit from "../../../assets/images/edit.svg"
import "./MyProfile.scss";
const MyProfile = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <WelcomeHeader showButton desc="Manage your personal details, preferences, and storytelling settings in one place." />
      <div className="cmn-box lg">
        <div className="mb-4">
          <h3>My Profile</h3>
          <p>View and manage your personal information.</p>
        </div>
        <div className="accordion">
          <AccordionItem
            title="Basic Information"
            isOpen={openIndex === 0}
            onToggle={() =>
              setOpenIndex(openIndex === 0 ? null : 0)
            }
          >
            <div className="profile-form">
              <form action="">
                <div className="my-profile-top mb-4">
                    <div className="my-profile-left">
                        <figure><img src={profileImg} alt="" /></figure>
                        <span className="edit-icon"><img src={edit} alt="" /></span>
                    </div>
                    <div className="my-profile-txt">
                        <h4>Change Profile Picture</h4>
                        <p>Edit your personal information.</p>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input type="email" className="form-control" placeholder="Enter email address ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Phone Number <span>(Optional)</span></label>
                      <input type="tel" className="form-control" placeholder="Enter phone number ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Date of Birth*</label>
                      <input type="date" className="form-control" placeholder="Select" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Religion*</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select</option>
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4">
                    <button type="button" className="btn btn-outline mw-100 submit-btn">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>
          <AccordionItem
            title="Occupation & Education"
            isOpen={openIndex === 1}
            onToggle={() =>
              setOpenIndex(openIndex === 1 ? null : 1)
            }
          >
           <div className="profile-form">
              <form action="">
                <div className="my-profile-top mb-4">
                    <div className="my-profile-left">
                        <figure><img src={profileImg} alt="" /></figure>
                        <span className="edit-icon"><img src={edit} alt="" /></span>
                    </div>
                    <div className="my-profile-txt">
                        <h4>Change Profile Picture</h4>
                        <p>Edit your personal information.</p>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input type="email" className="form-control" placeholder="Enter email address ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Phone Number <span>(Optional)</span></label>
                      <input type="tel" className="form-control" placeholder="Enter phone number ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Date of Birth*</label>
                      <input type="date" className="form-control" placeholder="Select" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Religion*</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select</option>
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4">
                    <button type="button" className="btn btn-outline mw-100 submit-btn">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>
          <AccordionItem
            title="Home & Living Situation"
            isOpen={openIndex === 2}
            onToggle={() =>
              setOpenIndex(openIndex === 2 ? null : 2)
            }
          >
            <div className="profile-form">
              <form action="">
                <div className="my-profile-top mb-4">
                    <div className="my-profile-left">
                        <figure><img src={profileImg} alt="" /></figure>
                        <span className="edit-icon"><img src={edit} alt="" /></span>
                    </div>
                    <div className="my-profile-txt">
                        <h4>Change Profile Picture</h4>
                        <p>Edit your personal information.</p>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input type="email" className="form-control" placeholder="Enter email address ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Phone Number <span>(Optional)</span></label>
                      <input type="tel" className="form-control" placeholder="Enter phone number ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Date of Birth*</label>
                      <input type="date" className="form-control" placeholder="Select" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Religion*</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select</option>
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4">
                    <button type="button" className="btn btn-outline mw-100 submit-btn">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Neighbourhood & Area"
            isOpen={openIndex === 3}
            onToggle={() =>
              setOpenIndex(openIndex === 3 ? null : 3)
            }
          >
            <div className="profile-form">
              <form action="">
                <div className="my-profile-top mb-4">
                    <div className="my-profile-left">
                        <figure><img src={profileImg} alt="" /></figure>
                        <span className="edit-icon"><img src={edit} alt="" /></span>
                    </div>
                    <div className="my-profile-txt">
                        <h4>Change Profile Picture</h4>
                        <p>Edit your personal information.</p>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input type="email" className="form-control" placeholder="Enter email address ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Phone Number <span>(Optional)</span></label>
                      <input type="tel" className="form-control" placeholder="Enter phone number ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Date of Birth*</label>
                      <input type="date" className="form-control" placeholder="Select" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Religion*</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select</option>
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4">
                    <button type="button" className="btn btn-outline mw-100 submit-btn">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>
          <AccordionItem
            title="Uploaded Content"
            isOpen={openIndex === 4}
            onToggle={() =>
              setOpenIndex(openIndex === 4 ? null : 4)
            }
          >
            <div className="profile-form">
              <form action="">
                <div className="my-profile-top mb-4">
                    <div className="my-profile-left">
                        <figure><img src={profileImg} alt="" /></figure>
                        <span className="edit-icon"><img src={edit} alt="" /></span>
                    </div>
                    <div className="my-profile-txt">
                        <h4>Change Profile Picture</h4>
                        <p>Edit your personal information.</p>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input type="text" className="form-control" placeholder="Enter your name ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input type="email" className="form-control" placeholder="Enter email address ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Phone Number <span>(Optional)</span></label>
                      <input type="tel" className="form-control" placeholder="Enter phone number ..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Date of Birth*</label>
                      <input type="date" className="form-control" placeholder="Select" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label float">Religion*</label>
                      <select name="" id="" className="form-control">
                        <option value="">Select</option>
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4">
                    <button type="button" className="btn btn-outline mw-100 submit-btn">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>
        </div>
        <div className="text-center mt-4">
          <button type="button" className="btn btn-secondary mw-100 submit-btn">Update Profile</button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;