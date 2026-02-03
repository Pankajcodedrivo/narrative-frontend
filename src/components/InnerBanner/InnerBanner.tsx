import innerBanner from "../../assets/images/inner-banner.jpg";
import "./InnerBanner.scss";
const InnerBanner = () => {
  return (
    <>
        <section className="inner-banner" style={{ backgroundImage: `url(${innerBanner})` }}>
            <div className="container">
                <div className="inner-hdr mb-4">
                    <h1 className="mb-0"><span>Turn memories into a beautiful life story</span> — Powered by AI.</h1>
                </div>
                <button type="button" className="btn btn-secondary">Start Your Story</button>
            </div>
        </section>
    </>
  );
};

export default InnerBanner;
