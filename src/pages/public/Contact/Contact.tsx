import contactImg from "../../../assets/images/contact-img.jpg";
import "./contact.scss";
import useContact from "./useContact";

const Contact = () => {
  const { formik, loading } = useContact();
  return (
    <section className="common-gap">
      <div className="container">
        <div className="inner-hdr text-center mb-4">
          <h1 className="mb-0">
            <span> Stay Connected</span> — Contact Us
          </h1>
        </div>
        <figure className="img-wrapper">
          <img src={contactImg} alt="" />
        </figure>
        <form onSubmit={formik.handleSubmit}>
          <p className="mb-4">
            We’d love to hear from you. Reach out with your questions, feedback,
            or ideas.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label float">First Name*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name ..."
                  value={formik.values.firstname}
                  name="firstname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="error">{formik.errors.firstname}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label float">Last Name*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name ..."
                  value={formik.values.lastname}
                  name="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="error">{formik.errors.lastname}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label float">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address ..."
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label float">
                  Phone Number <span>(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number ..."
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label float">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tell us how we can help you—we’re happy to assist!"
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="error">{formik.errors.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-12 text-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-secondary"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
