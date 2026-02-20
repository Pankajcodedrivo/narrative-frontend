// MyProfile.tsx
import React, { useState, useRef } from "react";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import profileImg from "../../../assets/images/profile-lg.png";
import edit from "../../../assets/images/edit.svg";
import { useProfile, SECTION_FIELDS } from "./useProfile";
import "./MyProfile.scss";

const MyProfile = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [validationTriggered, setValidationTriggered] = useState<{ [key: number]: boolean }>({});
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    storyLocked,
    handleSiblingsChange,
    handleSiblingDetailChange,
    handleSameAsEarlyChange,
    handleSameAsEarlyAdulthoodChange,
    handleMomentSelect,
    handleProfileImageChange,
    handleRemoveProfileImage,
    handleImageChange,
    handleRemoveImage,
    getFieldError,
    getNestedFieldError,
    isSubmitting,
    validateSection,
    getNestedValues,
    profileImageUrl,
    referenceImages
  } = useProfile();
  // Get nested values safely with type assertion
  const earlyChildhood = getNestedValues.earlyChildhood(values) as any;
  const lateChildhood = getNestedValues.lateChildhood(values) as any;
  const earlyAdulthood = getNestedValues.earlyAdulthood(values) as any;
  const lateAdulthood = getNestedValues.lateAdulthood(values) as any;
  const storyHighlight = getNestedValues.storyHighlight(values) as any;

  // Refs for accordion sections
  const sectionRefs = {
    0: useRef<HTMLDivElement>(null),
    1: useRef<HTMLDivElement>(null),
    2: useRef<HTMLDivElement>(null),
    3: useRef<HTMLDivElement>(null),
    4: useRef<HTMLDivElement>(null),
  };

  // Handle Next button click
  const handleNextClick = async (currentIndex: number) => {
    setValidationTriggered(prev => ({ ...prev, [currentIndex]: true }));
    
    const fieldsToValidate = SECTION_FIELDS[currentIndex as keyof typeof SECTION_FIELDS];
    const isValid = await validateSection(currentIndex, fieldsToValidate);
    
    if (isValid && currentIndex < 4) {
      setOpenIndex(currentIndex + 1);
      setTimeout(() => {
        sectionRefs[currentIndex + 1 as keyof typeof sectionRefs]?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  // Handle Previous button click
  const handlePreviousClick = (currentIndex: number) => {
    if (currentIndex > 0) {
      setOpenIndex(currentIndex - 1);
      setTimeout(() => {
        sectionRefs[currentIndex - 1 as keyof typeof sectionRefs]?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  // Helper function to get nested error message
  const getNestedErrorMessage = (parent: string, child: string) => {
    return (errors as any)?.[parent]?.[child];
  };

 // Helper function to extract filename from URL
const getFilenameFromUrl = (url: string) => {
  if (!url) return '';
  
  try {
    // Extract the filename from the URL
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    // Remove query parameters if any
    const filename = lastPart.split('?')[0];
    
    // Decode URI components
    return decodeURIComponent(filename);
  } catch (error) {
    console.error('Error extracting filename from URL:', error);
    return 'Image';
  }
};

// Helper function to format file name (updated)
const getFileName = (file: any) => {
  if (file instanceof File) {
    return file.name;
  }
  if (typeof file === 'string' && file) {
    return getFilenameFromUrl(file);
  }
  return 'File selected';
};

  return (
    <form onSubmit={handleSubmit}>
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
          <div ref={sectionRefs[0]}>
            <AccordionItem
              title="General"
              isOpen={openIndex === 0}
              onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
            >
              <div className="profile-form">
                <div className="my-profile-top mb-4">
                  <div className="my-profile-left">
                    <figure>
                      <img 
                        src={profileImageUrl || profileImg} 
                        alt="Profile" 
                      />
                    </figure>
                    <div className="profile-image-actions">
                      <input
                        type="file"
                        id="profile-image-upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleProfileImageChange(file);
                        }}
                      />
                      <label htmlFor="profile-image-upload" className="edit-icon">
                        <img src={edit} alt="Edit" />
                      </label>
                    
                    </div>
                  </div>
                  <div className="my-profile-txt">
                    <h4>Change Profile Picture</h4>
                    <p>Click the edit icon to upload a new profile picture</p>
                  </div>
                </div>

                <div className="row">
                  {/* Name + Email */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">First Name*</label>
                      <input
                        type="text"
                        className={`form-control ${getFieldError('firstName', 0, validationTriggered) ? 'is-invalid' : ''}`}
                        placeholder="Enter first name"
                        name="firstName"
                        value={values.firstName || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {getFieldError('firstName', 0, validationTriggered) && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Last Name*</label>
                      <input
                        type="text"
                        className={`form-control ${getFieldError('lastName', 0, validationTriggered) ? 'is-invalid' : ''}`}
                        placeholder="Enter last name"
                        name="lastName"
                        value={values.lastName || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {getFieldError('lastName', 0, validationTriggered) && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Email Address*</label>
                      <input
                        type="email"
                        className={`form-control ${getFieldError('email', 0, validationTriggered) ? 'is-invalid' : ''}`}
                        placeholder="Enter email address"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {getFieldError('email', 0, validationTriggered) && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Gender*</label>
                      <select
                        className={`form-control ${getFieldError('gender', 0, validationTriggered) ? 'is-invalid' : ''}`}
                        name="gender"
                        value={values.gender || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {getFieldError('gender', 0, validationTriggered) && (
                        <div className="invalid-feedback">{errors.gender}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Age Group*</label>
                      <select
                        className={`form-control ${getFieldError('ageGroup', 0, validationTriggered) ? 'is-invalid' : ''}`}
                        name="ageGroup"
                        value={values.ageGroup || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Under 50">Under 50 years old</option>
                        <option value="50-59">50-59 years old</option>
                        <option value="60-69">60-69 years old</option>
                        <option value="70-79">70-79 years old</option>
                        <option value="80-89">80-89 years old</option>
                        <option value="90-100">90-100 years old</option>
                      </select>
                      {getFieldError('ageGroup', 0, validationTriggered) && (
                        <div className="invalid-feedback">{errors.ageGroup}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Race / Ethnicity</label>
                      <select
                        className="form-control"
                        name="ethnicity"
                        value={values.ethnicity || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Black">Black or African American</option>
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic or Latino</option>
                        <option value="Native">American Indian or Alaska Native</option>
                        <option value="Middle Eastern">Middle Eastern or North African</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Paternal Caretaker Ethnicity</label>
                      <select
                        className="form-control"
                        name="paternalEthnicity"
                        value={values.paternalEthnicity || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Black">Black or African American</option>
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic or Latino</option>
                        <option value="Native">American Indian or Alaska Native</option>
                        <option value="Middle Eastern">Middle Eastern or North African</option>
                        <option value="NA">Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Maternal Caretaker Ethnicity</label>
                      <select
                        className="form-control"
                        name="maternalEthnicity"
                        value={values.maternalEthnicity || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Black">Black or African American</option>
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic or Latino</option>
                        <option value="Native">American Indian or Alaska Native</option>
                        <option value="Middle Eastern">Middle Eastern or North African</option>
                        <option value="NA">Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Number of Siblings</label>
                      <select
                        className="form-control"
                        value={values.siblingsCount || 0}
                        onChange={handleSiblingsChange}
                        onBlur={handleBlur}
                      >
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

                  {values.siblings?.map((sibling, index) => (
                    <React.Fragment key={index}>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Sibling {index + 1} Type</label>
                          <select
                            className="form-control"
                            value={sibling.type || ''}
                            onChange={(e) =>
                              handleSiblingDetailChange(index, "type", e.target.value)
                            }
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Sibling {index + 1} Order</label>
                          <select
                            className="form-control"
                            value={sibling.order || ''}
                            onChange={(e) =>
                              handleSiblingDetailChange(index, "order", e.target.value)
                            }
                            onBlur={handleBlur}
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
                      onClick={() => handleNextClick(0)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* ================= CHILDHOOD ================= */}
          <div ref={sectionRefs[1]}>
            <AccordionItem
              title="Childhood"
              isOpen={openIndex === 1}
              onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
            >
              <div className="profile-form">
                <div className="row">
                  <div className="col-12">
                    <h5 className="mb-3">Early Childhood (Age 0–12)</h5>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">City / State*</label>
                      <input
                        className={`form-control ${getNestedFieldError('earlyChildhood', 'cityState', 1, validationTriggered) ? 'is-invalid' : ''}`}
                        name="earlyChildhood.cityState"
                        value={earlyChildhood?.cityState || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {getNestedFieldError('earlyChildhood', 'cityState', 1, validationTriggered) && (
                        <div className="invalid-feedback">{getNestedErrorMessage('earlyChildhood', 'cityState')}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Geographic Area</label>
                      <select
                        className="form-control"
                        name="earlyChildhood.areaType"
                        value={earlyChildhood?.areaType || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                        <option value="Suburban">Suburban</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Neighborhood Class</label>
                      <select
                        className="form-control"
                        name="earlyChildhood.neighborhoodClass"
                        value={earlyChildhood?.neighborhoodClass || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Humble">Had humble beginnings</option>
                        <option value="Working">Working Class</option>
                        <option value="Middle">Middle Class</option>
                        <option value="Upper">Upper Class</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Living Space</label>
                      <select
                        className="form-control"
                        name="earlyChildhood.livingSpace"
                        value={earlyChildhood?.livingSpace || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Home">Home</option>
                        <option value="Apartment">Apartment building</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Condominium">Condominium</option>
                        <option value="RV">RV Style</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {earlyChildhood?.livingSpace === "Other" && (
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label float">Enter Living Space</label>
                        <input
                          className="form-control"
                          name="earlyChildhood.livingSpaceOther"
                          value={earlyChildhood?.livingSpaceOther || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-12 mt-4">
                    <h5>Late Childhood (Age 13–18)</h5>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Same as Early Childhood?</label>
                      <select
                        className="form-control"
                        onChange={handleSameAsEarlyChange}
                        value={values.sameAsEarly === true ? "Yes" : values.sameAsEarly === false ? "No" : ""}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  {values.sameAsEarly === false && (
                    <>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">City / State*</label>
                          <input
                            className={`form-control ${getNestedFieldError('lateChildhood', 'cityState', 1, validationTriggered) ? 'is-invalid' : ''}`}
                            name="lateChildhood.cityState"
                            value={lateChildhood?.cityState || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {getNestedFieldError('lateChildhood', 'cityState', 1, validationTriggered) && (
                            <div className="invalid-feedback">{getNestedErrorMessage('lateChildhood', 'cityState')}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Geographic Area</label>
                          <select
                            className="form-control"
                            name="lateChildhood.areaType"
                            value={lateChildhood?.areaType || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Urban">Urban</option>
                            <option value="Rural">Rural</option>
                            <option value="Suburban">Suburban</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Neighborhood Class</label>
                          <select
                            className="form-control"
                            name="lateChildhood.neighborhoodClass"
                            value={lateChildhood?.neighborhoodClass || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Humble">Had humble beginnings</option>
                            <option value="Working">Working Class</option>
                            <option value="Middle">Middle Class</option>
                            <option value="Upper">Upper Class</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Living Space</label>
                          <select
                            className="form-control"
                            name="lateChildhood.livingSpace"
                            value={lateChildhood?.livingSpace || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Home">Home</option>
                            <option value="Apartment">Apartment building</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Condominium">Condominium</option>
                            <option value="RV">RV Style</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {lateChildhood?.livingSpace === "Other" && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label float">Enter Living Space</label>
                            <input
                              className="form-control"
                              name="lateChildhood.livingSpaceOther"
                              value={lateChildhood?.livingSpaceOther || ''}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="col-md-12 text-center mt-4">
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline mw-100"
                        onClick={() => handlePreviousClick(1)}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline mw-100 submit-btn"
                        onClick={() => handleNextClick(1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* ================= ADULTHOOD ================= */}
          <div ref={sectionRefs[2]}>
            <AccordionItem
              title="Adulthood"
              isOpen={openIndex === 2}
              onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
            >
              <div className="profile-form">
                <div className="row">
                  <div className="col-12">
                    <h5>Early Adulthood (Age 19–30)</h5>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">City / State*</label>
                      <input
                        className={`form-control ${getNestedFieldError('earlyAdulthood', 'cityState', 2, validationTriggered) ? 'is-invalid' : ''}`}
                        name="earlyAdulthood.cityState"
                        value={earlyAdulthood?.cityState || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {getNestedFieldError('earlyAdulthood', 'cityState', 2, validationTriggered) && (
                        <div className="invalid-feedback">{getNestedErrorMessage('earlyAdulthood', 'cityState')}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Geographic Area</label>
                      <select
                        className="form-control"
                        name="earlyAdulthood.areaType"
                        value={earlyAdulthood?.areaType || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                        <option value="Suburban">Suburban</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Neighborhood Class</label>
                      <select
                        className="form-control"
                        name="earlyAdulthood.neighborhoodClass"
                        value={earlyAdulthood?.neighborhoodClass || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Humble">Had humble beginnings</option>
                        <option value="Working">Working Class</option>
                        <option value="Middle">Middle Class</option>
                        <option value="Upper">Upper Class</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Living Space</label>
                      <select
                        className="form-control"
                        name="earlyAdulthood.livingSpace"
                        value={earlyAdulthood?.livingSpace || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Home">Home</option>
                        <option value="Apartment">Apartment building</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Condominium">Condominium</option>
                        <option value="RV">RV Style</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {earlyAdulthood?.livingSpace === "Other" && (
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label float">Enter Living Space</label>
                        <input
                          className="form-control"
                          name="earlyAdulthood.livingSpaceOther"
                          value={earlyAdulthood?.livingSpaceOther || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Marital Status</label>
                      <select
                        className="form-control"
                        name="earlyAdulthood.maritalStatus"
                        value={earlyAdulthood?.maritalStatus || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Domestic Partner">Domestic Partner</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <h5>Late Adulthood (Age 30+)</h5>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Same as Early Adulthood?</label>
                      <select
                        className="form-control"
                        onChange={handleSameAsEarlyAdulthoodChange}
                        value={values.sameAsEarlyAdulthood === true ? "Yes" : values.sameAsEarlyAdulthood === false ? "No" : ""}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  {values.sameAsEarlyAdulthood === false && (
                    <>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">City / State*</label>
                          <input
                            className={`form-control ${getNestedFieldError('lateAdulthood', 'cityState', 2, validationTriggered) ? 'is-invalid' : ''}`}
                            name="lateAdulthood.cityState"
                            value={lateAdulthood?.cityState || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {getNestedFieldError('lateAdulthood', 'cityState', 2, validationTriggered) && (
                            <div className="invalid-feedback">{getNestedErrorMessage('lateAdulthood', 'cityState')}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Geographic Area</label>
                          <select
                            className="form-control"
                            name="lateAdulthood.areaType"
                            value={lateAdulthood?.areaType || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Urban">Urban</option>
                            <option value="Rural">Rural</option>
                            <option value="Suburban">Suburban</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Neighborhood Class</label>
                          <select
                            className="form-control"
                            name="lateAdulthood.neighborhoodClass"
                            value={lateAdulthood?.neighborhoodClass || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Humble">Had humble beginnings</option>
                            <option value="Working">Working Class</option>
                            <option value="Middle">Middle Class</option>
                            <option value="Upper">Upper Class</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Living Space</label>
                          <select
                            className="form-control"
                            name="lateAdulthood.livingSpace"
                            value={lateAdulthood?.livingSpace || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Home">Home</option>
                            <option value="Apartment">Apartment building</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Condominium">Condominium</option>
                            <option value="RV">RV Style</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {lateAdulthood?.livingSpace === "Other" && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label float">Enter Living Space</label>
                            <input
                              className="form-control"
                              name="lateAdulthood.livingSpaceOther"
                              value={lateAdulthood?.livingSpaceOther || ''}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Marital Status</label>
                          <select
                            className="form-control"
                            name="lateAdulthood.maritalStatus"
                            value={lateAdulthood?.maritalStatus || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Domestic Partner">Domestic Partner</option>
                            <option value="Separated">Separated</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-md-12 text-center mt-4">
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline mw-100"
                        onClick={() => handlePreviousClick(2)}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline mw-100 submit-btn"
                        onClick={() => handleNextClick(2)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* ================= STORY HIGHLIGHT ================= */}
          <div ref={sectionRefs[3]}>
            <AccordionItem
              title="Story Highlight"
              isOpen={openIndex === 3}
              onToggle={() => setOpenIndex(openIndex === 3 ? null : 3)}
            >
              <div className="profile-form">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Do you want to share a story moment?</label>
                      <select
                        className={`form-control ${getFieldError('shareStory', 3, validationTriggered) ? 'is-invalid' : ''}`}
                        name="shareStory"
                        value={values.shareStory || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No thanks</option>
                      </select>
                      {getFieldError('shareStory', 3, validationTriggered) && (
                        <div className="invalid-feedback">{errors.shareStory}</div>
                      )}
                    </div>
                  </div>

                  {values.shareStory === "Yes" && (
                    <>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Moment / Event*</label>
                          <select
                            className={`form-control ${getNestedFieldError('storyHighlight', 'momentType', 3, validationTriggered) ? 'is-invalid' : ''}`}
                            value={storyHighlight?.momentType || ''}
                            onChange={handleMomentSelect}
                            onBlur={handleBlur}
                            disabled={storyLocked}
                            name="storyHighlight.momentType"
                          >
                            <option value="">Select</option>
                            <option value="Career Change">Career Change</option>
                            <option value="Marriage">Marriage</option>
                            <option value="Loss of Loved One">Loss of Loved One</option>
                            <option value="Birth of Child">Birth of Child</option>
                            <option value="Health Challenge">Health Challenge</option>
                            <option value="Other">Other</option>
                          </select>
                          {getNestedFieldError('storyHighlight', 'momentType', 3, validationTriggered) && (
                            <div className="invalid-feedback">{getNestedErrorMessage('storyHighlight', 'momentType')}</div>
                          )}
                        </div>
                      </div>

                      {storyHighlight?.momentType === "Other" && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label float">Enter Moment</label>
                            <input
                              className={`form-control ${getNestedFieldError('storyHighlight', 'momentOther', 3, validationTriggered) ? 'is-invalid' : ''}`}
                              value={storyHighlight?.momentOther || ''}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={storyLocked}
                              name="storyHighlight.momentOther"
                            />
                            {getNestedFieldError('storyHighlight', 'momentOther', 3, validationTriggered) && (
                              <div className="invalid-feedback">{getNestedErrorMessage('storyHighlight', 'momentOther')}</div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label float">Impact on Life*</label>
                          <select
                            className={`form-control ${getNestedFieldError('storyHighlight', 'impactType', 3, validationTriggered) ? 'is-invalid' : ''}`}
                            value={storyHighlight?.impactType || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="storyHighlight.impactType"
                          >
                            <option value="">Select</option>
                            <option value="Changed career direction">Changed career direction</option>
                            <option value="Strengthened relationships">Strengthened relationships</option>
                            <option value="Improved personal growth">Improved personal growth</option>
                            <option value="Changed life perspective">Changed life perspective</option>
                            <option value="Other">Other</option>
                          </select>
                          {getNestedFieldError('storyHighlight', 'impactType', 3, validationTriggered) && (
                            <div className="invalid-feedback">{getNestedErrorMessage('storyHighlight', 'impactType')}</div>
                          )}
                        </div>
                      </div>

                      {storyHighlight?.impactType === "Other" && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label float">Enter Impact</label>
                            <input
                              className={`form-control ${getNestedFieldError('storyHighlight', 'impactOther', 3, validationTriggered) ? 'is-invalid' : ''}`}
                              value={storyHighlight?.impactOther || ''}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="storyHighlight.impactOther"
                            />
                            {getNestedFieldError('storyHighlight', 'impactOther', 3, validationTriggered) && (
                              <div className="invalid-feedback">{getNestedErrorMessage('storyHighlight', 'impactOther')}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="col-md-12 text-center mt-4">
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline mw-100"
                        onClick={() => handlePreviousClick(3)}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline mw-100 submit-btn"
                        onClick={() => handleNextClick(3)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* ================= REFERENCE IMAGES ================= */}
          <div ref={sectionRefs[4]}>
            <AccordionItem
              title="Reference Images"
              isOpen={openIndex === 4}
              onToggle={() => setOpenIndex(openIndex === 4 ? null : 4)}
            >
              <div className="profile-form">
                <p>Reference images are images that you can load that help us depict your character in your story.  
                  The images that are generated based on the references may not be an exact match, but they're designed to feel close and relatable—your story always comes first</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Early Childhood (0-12)</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        name="earlyChildhoodImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleImageChange('earlyChildhoodImage', file);
                        }}
                      />
                      {/* Show existing uploaded image or newly selected file */}
                      {(values.earlyChildhoodImage instanceof File || referenceImages?.earlyChildhood) && (
                        <div className="file-info mt-2">
                          <span className="text-success">
                            ✓ {values.earlyChildhoodImage instanceof File 
                              ? getFileName(values.earlyChildhoodImage.name )
                              : getFileName(referenceImages?.earlyChildhood)}
                          </span>
                          
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Late Childhood (13-18)</label>
                      <input 
                        type="file" 
                        className="form-control"
                        name="lateChildhoodImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleImageChange('lateChildhoodImage', file);
                        }}
                      />
                      {(values.lateChildhoodImage instanceof File || referenceImages?.lateChildhood) && (
                        <div className="file-info mt-2">
                          <span className="text-success">
                            ✓ {values.lateChildhoodImage instanceof File 
                              ? getFileName(values.lateChildhoodImage.name)
                              : getFileName(referenceImages?.lateChildhood)}
                          </span>
                        
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Early Adulthood (19-30)</label>
                      <input 
                        type="file" 
                        className="form-control"
                        name="earlyAdulthoodImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleImageChange('earlyAdulthoodImage', file);
                        }}
                      />
                      {(values.earlyAdulthoodImage instanceof File || referenceImages?.earlyAdulthood) && (
                        <div className="file-info mt-2">
                          <span className="text-success">
                            ✓ {values.earlyAdulthoodImage instanceof File 
                              ? getFileName(values.earlyAdulthoodImage.name)
                              : getFileName(referenceImages?.earlyAdulthood)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-label float">Late Adulthood (30 and above)</label>
                      <input 
                        type="file" 
                        className="form-control"
                        name="lateAdulthoodImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleImageChange('lateAdulthoodImage', file);
                        }}
                      />
                      {(values.lateAdulthoodImage instanceof File || referenceImages?.lateAdulthood) && (
                        <div className="file-info mt-2">
                          <span className="text-success">
                            ✓ {values.lateAdulthoodImage instanceof File 
                              ? getFileName(values.lateAdulthoodImage.name)
                              : getFileName(referenceImages?.lateAdulthood)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-12 text-center mt-4">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline mw-100"
                      onClick={() => handlePreviousClick(4)}
                    >
                      Previous
                    </button>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-secondary mw-100 submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyProfile;