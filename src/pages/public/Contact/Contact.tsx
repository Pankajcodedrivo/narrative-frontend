import contactImg from "../../../assets/images/contact-img.jpg";
import "./contact.scss";
const Contact = () => {
  return (
    <section className="common-gap">
      <div className="container">
          <div className="inner-hdr text-center mb-4">
              <h1 className="mb-0"><span> Stay Connected</span> — Contact Us</h1>
          </div>
          <figure className="contact-pic"><img src={contactImg} alt="" /></figure>
          <form action="">
              <p className="mb-4">We’d love to hear from you. Reach out with your questions, feedback, or ideas.</p>
              <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                          <label className="form-label float">Name</label>
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
                          <label className="form-label float">Subject*</label>
                          <select className="form-control">
                              <option value="">Select</option>
                              <option value="">Select</option>
                          </select>
                      </div>
                  </div>
                  <div className="col-md-12">
                      <div className="form-group">
                          <label className="form-label float">Notes</label>
                          <textarea className="form-control" placeholder="Tell us how we can help you—we’re happy to assist!"></textarea>
                      </div>
                  </div>
                  <div className="col-md-12 text-center mt-3">
                      <button type="submit" className="btn btn-secondary">Send Message</button>
                  </div>
              </div>
          </form>
        </div>
    </section>
  );
};

export default Contact;
