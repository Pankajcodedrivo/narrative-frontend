import React, { useState } from "react";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import profileImg from "../../../assets/images/profile-lg.png";
import edit from "../../../assets/images/edit.svg";
import "./MyProfile.scss";

type Sibling = {
  type: string;
  order: string;
};

const MyProfile = () => {
const [openIndex, setOpenIndex] = useState<number | null>(null);

// General
const [siblingsCount, setSiblingsCount] = useState<number>(0);
const [siblings, setSiblings] = useState<Sibling[]>([]);

const handleSiblingsChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const count = parseInt(e.target.value) || 0;
  setSiblingsCount(count);
  const newSiblings: Sibling[] = Array.from(
    { length: count },
    () => ({
      type: "",
      order: "",
    })
  );
  setSiblings(newSiblings);
};
const handleSiblingDetailChange = (
  index: number,
  field: keyof Sibling,
  value: string
) => {
  const updated = [...siblings];
  updated[index][field] = value;
  setSiblings(updated);
};

// Childhood
const [sameAsEarly, setSameAsEarly] = useState<boolean | null>(null);

const [earlyChildhood, setEarlyChildhood] = useState({
  cityState: "",
  areaType: "",
  neighborhoodClass: "",
  livingSpace: "",
  livingSpaceOther: "",
});

const [lateChildhood, setLateChildhood] = useState({
  cityState: "",
  areaType: "",
  neighborhoodClass: "",
  livingSpace: "",
  livingSpaceOther: "",
});

const handleEarlyChange = (
  field: string,
  value: string
) => {
  setEarlyChildhood(prev => ({
    ...prev,
    [field]: value,
  }));
};

const handleLateChange = (
  field: string,
  value: string
) => {
  setLateChildhood(prev => ({
    ...prev,
    [field]: value,
  }));
};
const handleSameChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const value = e.target.value === "Yes";
  setSameAsEarly(value);

  if (value) {
    setLateChildhood(earlyChildhood);
  }
};

// Authhood
const [sameAsEarlyAdulthood, setSameAsEarlyAdulthood] = useState<boolean | null>(null);

const [earlyAdulthood, setEarlyAdulthood] = useState({
  cityState: "",
  areaType: "",
  neighborhoodClass: "",
  livingSpace: "",
  livingSpaceOther: "",
  maritalStatus: "",
});

const [lateAdulthood, setLateAdulthood] = useState({
  cityState: "",
  areaType: "",
  neighborhoodClass: "",
  livingSpace: "",
  livingSpaceOther: "",
  maritalStatus: "",
});
const handleEarlyAdulthoodChange = (
  field: string,
  value: string
) => {
  setEarlyAdulthood(prev => ({
    ...prev,
    [field]: value,
  }));
};

const handleLateAdulthoodChange = (
  field: string,
  value: string
) => {
  setLateAdulthood(prev => ({
    ...prev,
    [field]: value,
  }));
};

const handleSameAdulthoodChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const value = e.target.value === "Yes";

  setSameAsEarlyAdulthood(value);

  if (value) {
    setLateAdulthood(earlyAdulthood);
  }
};

// Story hight

const [shareStory, setShareStory] = useState<string>("");
const [storyLocked, setStoryLocked] = useState<boolean>(false);
const [storyHighlight, setStoryHighlight] = useState({
  momentType: "",
  momentOther: "",
  impactType: "",
  impactOther: "",
});

const handleShareStoryChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  setShareStory(e.target.value);
};

const handleStoryChange = (
  field: string,
  value: string
) => {
  if (storyLocked && field === "momentType") return;

  setStoryHighlight(prev => ({
    ...prev,
    [field]: value,
  }));
};

const handleMomentSelect = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const value = e.target.value;

  if (value && !storyLocked) {
    const confirmLock = window.confirm(
      "Once selected, you cannot change this moment. Continue?"
    );

    if (confirmLock) {
      setStoryHighlight(prev => ({
        ...prev,
        momentType: value,
      }));

      setStoryLocked(true);
    }
  }
};




  return (
    <>
      <WelcomeHeader
        showButton
        desc="Manage your personal details, preferences, and storytelling settings in one place."
      />

      <div className="cmn-box lg">
        <div className="mb-4">
          <h3>My Profile</h3>
          <p>Help us tell your story in a way that feels true to you?</p>
          <p>
            Not every field is required, feel free to move through this at your
            own pace—extra details just help us better capture what matters to
            you
          </p>
        </div>

        <div className="accordion">
          {/* ================= GENERAL ================= */}
          <AccordionItem
            title="General"
            isOpen={openIndex === 0}
            onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
          >
            <div className="profile-form">
              <form>
                <div className="my-profile-top mb-4">
                  <div className="my-profile-left">
                    <figure>
                      <img src={profileImg} alt="" />
                    </figure>
                    <span className="edit-icon">
                      <img src={edit} alt="" />
                    </span>
                  </div>
                  <div className="my-profile-txt">
                    <h4>Change Profile Picture</h4>
                    <p>Edit your personal information.</p>
                  </div>
                </div>

                <div className="row">
                  {/* Name + Email */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Gender*</label>
                      <select className="form-control">
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Age Group */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Age Group*</label>
                      <select className="form-control">
                        <option value="">Select</option>
                        <option>Under 50 years old</option>
                        <option>50-59 years old</option>
                        <option>60-69 years old</option>
                        <option>70-79 years old</option>
                        <option>80-89 years old</option>
                        <option>90-100 years old</option>
                      </select>
                    </div>
                  </div>

                  {/* Ethnicity */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Race / Ethnicity</label>
                      <select className="form-control">
                        <option value="">Select</option>
                        <option>Black or African American</option>
                        <option>White</option>
                        <option>Asian</option>
                        <option>Hispanic or Latino</option>
                        <option>American Indian or Alaska Native</option>
                        <option>Middle Eastern or North African</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Paternal */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">
                        Paternal Caretaker Ethnicity
                      </label>
                      <select className="form-control">
                        <option value="">Select</option>
                        <option>Black or African American</option>
                        <option>White</option>
                        <option>Asian</option>
                        <option>Hispanic or Latino</option>
                        <option>American Indian or Alaska Native</option>
                        <option>Middle Eastern or North African</option>
                        <option>Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  {/* Maternal */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">
                        Maternal Caretaker Ethnicity
                      </label>
                      <select className="form-control">
                        <option value="">Select</option>
                        <option>Black or African American</option>
                        <option>White</option>
                        <option>Asian</option>
                        <option>Hispanic or Latino</option>
                        <option>American Indian or Alaska Native</option>
                        <option>Middle Eastern or North African</option>
                        <option>Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  {/* Siblings */}
                <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label float">Number of Siblings</label>
                  <select
                    className="form-control"
                    value={siblingsCount}
                    onChange={handleSiblingsChange}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6"></div>

              {siblings.map((sibling, index) => (
              <React.Fragment key={index}>
                
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label float">
                      Sibling {index + 1} Type
                    </label>
                    <select
                      className="form-control"
                      //value={sibling.type}
                      onChange={(e) =>
                        handleSiblingDetailChange(index, "type", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label float">
                      Sibling {index + 1} Order
                    </label>
                    <select
                      className="form-control"
                      //value={sibling.order}
                      onChange={(e) =>
                        handleSiblingDetailChange(index, "order", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Older">Older</option>
                      <option value="Younger">Younger</option>
                    </select>
                  </div>
                </div>

              </React.Fragment>
            ))}
                  <div className="col-md-12 text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-outline mw-100 submit-btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>

          {/* ================= CHILDHOOD ================= */}
          <AccordionItem
            title="Childhood"
            isOpen={openIndex === 1}
            onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
          >
            <div className="profile-form">
  <form>
    <div className="row">

      {/* ================= EARLY CHILDHOOD ================= */}
      <div className="col-12">
        <h5 className="mb-3">Early Childhood (Age 0–12)</h5>
      </div>

      {/* City/State */}
      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            City / State*
          </label>
          <input
            className="form-control"
            value={earlyChildhood.cityState}
            onChange={(e) =>
              handleEarlyChange("cityState", e.target.value)
            }
          />
        </div>
      </div>

      {/* Area Type */}
      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            Geographic Area
          </label>
          <select
            className="form-control"
            value={earlyChildhood.areaType}
            onChange={(e) =>
              handleEarlyChange("areaType", e.target.value)
            }
          >
            <option value="">Select</option>
            <option>Urban</option>
            <option>Rural</option>
            <option>Suburban</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Neighborhood */}
      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            Neighborhood Class
          </label>
          <select
            className="form-control"
            value={earlyChildhood.neighborhoodClass}
            onChange={(e) =>
              handleEarlyChange(
                "neighborhoodClass",
                e.target.value
              )
            }
          >
            <option value="">Select</option>
            <option>Had humble beginnings</option>
            <option>Working Class</option>
            <option>Middle Class</option>
            <option>Upper Class</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Living Space */}
      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            Living Space
          </label>
          <select
            className="form-control"
            value={earlyChildhood.livingSpace}
            onChange={(e) =>
              handleEarlyChange("livingSpace", e.target.value)
            }
          >
            <option value="">Select</option>
            <option>Home</option>
            <option>Apartment building</option>
            <option>Townhouse</option>
            <option>Condominium</option>
            <option>RV Style</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Other Living Space */}
      {earlyChildhood.livingSpace === "Other" && (
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Enter Living Space
            </label>
            <input
              className="form-control"
              value={earlyChildhood.livingSpaceOther}
              onChange={(e) =>
                handleEarlyChange(
                  "livingSpaceOther",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      )}

      {/* ================= SAME QUESTION ================= */}
      <div className="col-12 mt-4">
        <h5>Late Childhood (Age 13–18)</h5>
      </div>

      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            Same as Early Childhood?
          </label>
          <select
            className="form-control"
            onChange={handleSameChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* ================= LATE CHILDHOOD CONDITIONAL ================= */}
      {sameAsEarly === false && (
        <>
          {/* City/State */}
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label float">
                City / State*
              </label>
              <input
                className="form-control"
                value={lateChildhood.cityState}
                onChange={(e) =>
                  handleLateChange(
                    "cityState",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* Area */}
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label float">
                Geographic Area
              </label>
              <select
                className="form-control"
                value={lateChildhood.areaType}
                onChange={(e) =>
                  handleLateChange(
                    "areaType",
                    e.target.value
                  )
                }
              >
                <option value="">Select</option>
                <option>Urban</option>
                <option>Rural</option>
                <option>Suburban</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Living Space */}
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label float">
                Living Space
              </label>
              <select
                className="form-control"
                value={lateChildhood.livingSpace}
                onChange={(e) =>
                  handleLateChange(
                    "livingSpace",
                    e.target.value
                  )
                }
              >
                <option value="">Select</option>
                <option>Home</option>
                <option>Apartment building</option>
                <option>Townhouse</option>
                <option>Condominium</option>
                <option>RV Style</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </>
      )}

    </div>
  </form>
</div>

          </AccordionItem>

          {/* ================= ADULTHOOD ================= */}
        <AccordionItem
  title="Adulthood"
  isOpen={openIndex === 2}
  onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
>
  <div className="profile-form">
    <form>
      <div className="row">

        {/* ================= EARLY ADULTHOOD ================= */}

        <div className="col-12">
          <h5>Early Adulthood (Age 19–30)</h5>
        </div>

        {/* City */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              City / State*
            </label>
            <input
              className="form-control"
              value={earlyAdulthood.cityState}
              onChange={(e) =>
                handleEarlyAdulthoodChange(
                  "cityState",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Area */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Geographic Area
            </label>
            <select
              className="form-control"
              value={earlyAdulthood.areaType}
              onChange={(e) =>
                handleEarlyAdulthoodChange(
                  "areaType",
                  e.target.value
                )
              }
            >
              <option value="">Select</option>
              <option>Urban</option>
              <option>Rural</option>
              <option>Suburban</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Neighborhood */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Neighborhood Class
            </label>
            <select
              className="form-control"
              value={earlyAdulthood.neighborhoodClass}
              onChange={(e) =>
                handleEarlyAdulthoodChange(
                  "neighborhoodClass",
                  e.target.value
                )
              }
            >
              <option value="">Select</option>
              <option>Had humble beginnings</option>
              <option>Working Class</option>
              <option>Middle Class</option>
              <option>Upper Class</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Living Space */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Living Space
            </label>
            <select
              className="form-control"
              value={earlyAdulthood.livingSpace}
              onChange={(e) =>
                handleEarlyAdulthoodChange(
                  "livingSpace",
                  e.target.value
                )
              }
            >
              <option value="">Select</option>
              <option>Home</option>
              <option>Apartment building</option>
              <option>Townhouse</option>
              <option>Condominium</option>
              <option>RV Style</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Other Living Space */}
        {earlyAdulthood.livingSpace === "Other" && (
          <div className="col-lg-6">
            <div className="form-group">
              <label className="form-label float">
                Enter Living Space
              </label>
              <input
                className="form-control"
                value={earlyAdulthood.livingSpaceOther}
                onChange={(e) =>
                  handleEarlyAdulthoodChange(
                    "livingSpaceOther",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        )}

        {/* Marital Status */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Marital Status
            </label>
            <select
              className="form-control"
              value={earlyAdulthood.maritalStatus}
              onChange={(e) =>
                handleEarlyAdulthoodChange(
                  "maritalStatus",
                  e.target.value
                )
              }
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Domestic Partner</option>
              <option>Separated</option>
            </select>
          </div>
        </div>

        {/* ================= SAME QUESTION ================= */}

        <div className="col-12 mt-4">
          <h5>Late Adulthood (Age 30+)</h5>
        </div>

        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Same as Early Adulthood?
            </label>
            <select
              className="form-control"
              onChange={handleSameAdulthoodChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* ================= CONDITIONAL ================= */}

{sameAsEarlyAdulthood === false && (
  <>

    {/* City / State */}
    <div className="col-lg-6">
      <div className="form-group">
        <label className="form-label float">
          City / State*
        </label>
        <input
          className="form-control"
          value={lateAdulthood.cityState}
          onChange={(e) =>
            handleLateAdulthoodChange(
              "cityState",
              e.target.value
            )
          }
        />
      </div>
    </div>

    {/* Geographic Area */}
    <div className="col-lg-6">
      <div className="form-group">
        <label className="form-label float">
          Geographic Area
        </label>
        <select
          className="form-control"
          value={lateAdulthood.areaType}
          onChange={(e) =>
            handleLateAdulthoodChange(
              "areaType",
              e.target.value
            )
          }
        >
          <option value="">Select</option>
          <option>Urban</option>
          <option>Rural</option>
          <option>Suburban</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    {/* Neighborhood Class */}
    <div className="col-lg-6">
      <div className="form-group">
        <label className="form-label float">
          Neighborhood Class
        </label>
        <select
          className="form-control"
          value={lateAdulthood.neighborhoodClass}
          onChange={(e) =>
            handleLateAdulthoodChange(
              "neighborhoodClass",
              e.target.value
            )
          }
        >
          <option value="">Select</option>
          <option>Had humble beginnings</option>
          <option>Working Class</option>
          <option>Middle Class</option>
          <option>Upper Class</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    {/* Living Space */}
    <div className="col-lg-6">
      <div className="form-group">
        <label className="form-label float">
          Living Space
        </label>
        <select
          className="form-control"
          value={lateAdulthood.livingSpace}
          onChange={(e) =>
            handleLateAdulthoodChange(
              "livingSpace",
              e.target.value
            )
          }
        >
          <option value="">Select</option>
          <option>Home</option>
          <option>Apartment building</option>
          <option>Townhouse</option>
          <option>Condominium</option>
          <option>RV Style</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    {/* Living Space Other */}
    {lateAdulthood.livingSpace === "Other" && (
      <div className="col-lg-6">
        <div className="form-group">
          <label className="form-label float">
            Enter Living Space
          </label>
          <input
            className="form-control"
            value={lateAdulthood.livingSpaceOther}
            onChange={(e) =>
              handleLateAdulthoodChange(
                "livingSpaceOther",
                e.target.value
              )
            }
          />
        </div>
      </div>
    )}

    {/* Marital Status */}
    <div className="col-lg-6">
      <div className="form-group">
        <label className="form-label float">
          Marital Status
        </label>
        <select
          className="form-control"
          value={lateAdulthood.maritalStatus}
          onChange={(e) =>
            handleLateAdulthoodChange(
              "maritalStatus",
              e.target.value
            )
          }
        >
          <option value="">Select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
          <option>Domestic Partner</option>
          <option>Separated</option>
        </select>
      </div>
    </div>

  </>
)}


      </div>
    </form>
  </div>
</AccordionItem>


          {/* ================= STORY HIGHLIGHT ================= */}
            <AccordionItem
  title="Story Highlight"
  isOpen={openIndex === 3}
  onToggle={() => setOpenIndex(openIndex === 3 ? null : 3)}
>
  <div className="profile-form">
    <form>
      <div className="row">

        {/* Share Story */}
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label float">
              Do you want to share a story moment?
            </label>
            <select
              className="form-control"
              value={shareStory}
              onChange={handleShareStoryChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No thanks</option>
            </select>
          </div>
        </div>

        {/* Conditional Fields */}
        {shareStory === "Yes" && (
          <>

            {/* Moment Dropdown */}
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label float">
                  Moment / Event*
                </label>
                <select
                  className="form-control"
                  value={storyHighlight.momentType}
                  onChange={handleMomentSelect}
                  disabled={storyLocked}
                >
                  <option value="">Select</option>
                  <option>Career Change</option>
                  <option>Marriage</option>
                  <option>Loss of Loved One</option>
                  <option>Birth of Child</option>
                  <option>Health Challenge</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Moment Other */}
            {storyHighlight.momentType === "Other" && (
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label float">
                    Enter Moment
                  </label>
                  <input
                    className="form-control"
                    value={storyHighlight.momentOther}
                    onChange={(e) =>
                      handleStoryChange(
                        "momentOther",
                        e.target.value
                      )
                    }
                    disabled={storyLocked}
                  />
                </div>
              </div>
            )}

            {/* Impact Dropdown */}
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label float">
                  Impact on Life*
                </label>
                <select
                  className="form-control"
                  value={storyHighlight.impactType}
                  onChange={(e) =>
                    handleStoryChange(
                      "impactType",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select</option>
                  <option>Changed career direction</option>
                  <option>Strengthened relationships</option>
                  <option>Improved personal growth</option>
                  <option>Changed life perspective</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Impact Other */}
            {storyHighlight.impactType === "Other" && (
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label float">
                    Enter Impact
                  </label>
                  <input
                    className="form-control"
                    value={storyHighlight.impactOther}
                    onChange={(e) =>
                      handleStoryChange(
                        "impactOther",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}

          </>
        )}

      </div>
    </form>
  </div>
</AccordionItem>


          {/* ================= REFERENCE IMAGES ================= */}
          <AccordionItem
            title="Reference Images"
            isOpen={openIndex === 4}
            onToggle={() => setOpenIndex(openIndex === 4 ? null : 4)}
          >
            <div className="profile-form">
              <p>Reference images are images that you can load that help us depict your character in your story.  
                The images that are generated based on the references may not be an exact match, but they’re designed to feel close and relatable—your story always comes first</p>
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Early Childhood (0-12)</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Late Childhood (13-18)</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Early Adulthood (19-30)</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Late Adulthood (30 and above)</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </AccordionItem>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-secondary mw-100 submit-btn"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
