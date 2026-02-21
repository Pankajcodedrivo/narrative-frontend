// hooks/useProfile.ts
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { profileSchema } from '../../../../utils/yupSchemas';
import type { ProfileFormData } from '../../../../utils/yupSchemas';
import { getProfile, updateProfile } from '../../../../services/apis/user.api';

// Types
export type Sibling = {
  type: string;
  order: string;
};

export type ChildhoodStage = {
  city: string;
  state: string;
  areaType: string;
  neighborhoodClass: string;
  livingSpace: string;
  livingSpaceOther: string;
};

export type AdulthoodStage = ChildhoodStage & {
  maritalStatus: string;
};

export type StoryHighlightType = {
  momentType: string;
  momentOther: string;
  impactType: string;
  impactOther: string;
};

export type ReferenceImages = {
  earlyChildhood?: string;
  lateChildhood?: string;
  earlyAdulthood?: string;
  lateAdulthood?: string;
};

// Section field mappings for validation
export const SECTION_FIELDS = {
  0: ['firstName', 'lastName', 'email', 'gender', 'ageGroup'],
  1: ['earlyChildhood.city', 'earlyChildhood.state'],
  2: ['earlyAdulthood.city', 'earlyAdulthood.state'],
  3: ['shareStory'],
  4: [],
};

// Initial values with proper typing
const initialValues: ProfileFormData = {
  // General
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  ageGroup: '',
  ethnicity: '',
  ethnicityOther: '',
  paternalEthnicity: '',
  paternalEthnicityOther: '',
  maternalEthnicity: '',
  maternalEthnicityOther: '',
  siblingsCount: 0,
  siblings: [],
  musicGenres: [],
  
  // Profile Image
  profileimageurl: null,
  
  // Childhood
  sameAsEarly: null,
  earlyChildhood: {
    city: '',
    state: '',
    areaType: '',
    neighborhoodClass: '',
    livingSpace: '',
    livingSpaceOther: '',
  },
  lateChildhood: {
    city: '',
    state: '',
    areaType: '',
    neighborhoodClass: '',
    livingSpace: '',
    livingSpaceOther: '',
  },
  
  // Adulthood
  sameAsEarlyAdulthood: null,
  earlyAdulthood: {
    city: '',
    state: '',
    areaType: '',
    neighborhoodClass: '',
    livingSpace: '',
    livingSpaceOther: '',
    maritalStatus: '',
  },
  lateAdulthood: {
    city: '',
    state: '',
    areaType: '',
    neighborhoodClass: '',
    livingSpace: '',
    livingSpaceOther: '',
    maritalStatus: '',
  },
  
  // Story Highlight
  shareStory: '',
  storyHighlight: {
    momentType: '',
    momentOther: '',
    impactType: '',
    impactOther: '',
  },
  
  // Reference Images
  earlyChildhoodImage: null,
  lateChildhoodImage: null,
  earlyAdulthoodImage: null,
  lateAdulthoodImage: null,
};

// Type-safe getters for nested values
export const getNestedValues = {
  earlyChildhood: (values: ProfileFormData) => values.earlyChildhood,
  lateChildhood: (values: ProfileFormData) => values.lateChildhood,
  earlyAdulthood: (values: ProfileFormData) => values.earlyAdulthood,
  lateAdulthood: (values: ProfileFormData) => values.lateAdulthood,
  storyHighlight: (values: ProfileFormData) => values.storyHighlight,
};

interface UseProfileReturn {
  formik: ReturnType<typeof useFormik<ProfileFormData>>;
  storyLocked: boolean;
  setStoryLocked: (locked: boolean) => void;
  handleSiblingsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSiblingDetailChange: (index: number, field: keyof Sibling, value: string) => void;
  handleSameAsEarlyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSameAsEarlyAdulthoodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMomentSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleImageChange: (field: string, file: File | null) => void;
  handleRemoveImage: (field: string) => void;
  handleProfileImageChange: (file: File | null) => void;
  handleRemoveProfileImage: () => void;
  handleMusicGenreChange: (genre: string, checked: boolean) => void;
  getFieldError: (fieldName: keyof ProfileFormData, sectionIndex: number, validationTriggered: { [key: number]: boolean }) => string | undefined;
  getNestedFieldError: (
    parent: keyof typeof getNestedValues,
    child: string,
    sectionIndex: number,
    validationTriggered: { [key: number]: boolean }
  ) => string | undefined;
  isSubmitting: boolean;
  isLoading: boolean;
  isValid: boolean;
  dirty: boolean;
  resetForm: () => void;
  validateSection: (sectionIndex: number, fields: string[]) => Promise<boolean>;
  values: ProfileFormData;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: any;
  setFieldValue: any;
  getNestedValues: typeof getNestedValues;
  loadUserProfile: () => Promise<void>;
  profileImageUrl: string | null;
  referenceImages: ReferenceImages;
  musicGenres: string[];
}

export const useProfile = (): UseProfileReturn => {
  const [storyLocked, setStoryLocked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [referenceImages, setReferenceImages] = useState<ReferenceImages>({});
  const [musicGenres, setMusicGenres] = useState<string[]>([]);
  
  const formik = useFormik<ProfileFormData>({
    initialValues,
    validationSchema: profileSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsSubmitting(true);
      try {
        // Create FormData for file uploads
        const formData = new FormData();
        
        // Append profile image if exists and is a File
        if (values.profileimageurl instanceof File) {
          formData.append('profileimageurl', values.profileimageurl);
        }

        // Append reference images
        const imageFields = [
          'earlyChildhoodImage',
          'lateChildhoodImage',
          'earlyAdulthoodImage',
          'lateAdulthoodImage'
        ] as const;

        imageFields.forEach(field => {
          const value = values[field];
          if (value instanceof File) {
            formData.append(field, value);
          }
        });

        // FIXED: Handle musicGenres separately - send as plain array, not stringified
        // Filter out empty strings
        const filteredMusicGenres = musicGenres.filter(genre => genre.trim() !== '');
        formData.append('musicGenres', JSON.stringify(filteredMusicGenres));

        // Append all other data as JSON
        const dataToSend = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          ageGroup: values.ageGroup,
          ethnicity: values.ethnicity,
          ethnicityOther: values.ethnicityOther,
          paternalEthnicity: values.paternalEthnicity,
          paternalEthnicityOther: values.paternalEthnicityOther,
          maternalEthnicity: values.maternalEthnicity,
          maternalEthnicityOther: values.maternalEthnicityOther,
          siblingsCount: values.siblingsCount,
          siblings: values.siblings,
          sameAsEarly: values.sameAsEarly,
          earlyChildhood: values.earlyChildhood,
          lateChildhood: values.lateChildhood,
          sameAsEarlyAdulthood: values.sameAsEarlyAdulthood,
          earlyAdulthood: values.earlyAdulthood,
          lateAdulthood: values.lateAdulthood,
          shareStory: values.shareStory,
          storyHighlight: values.storyHighlight,
        };

        // Append JSON data - but NOT musicGenres since we already appended it
        Object.entries(dataToSend).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });

        const response = await updateProfile(formData);
        
        if (response.success) {
          if (response.data?.user) {
            await loadUserProfile();
          }
        }
      } catch (error: any) {
        console.error('Error updating profile:', error);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  // Load user profile on mount
  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      if (response && response.user) {
        const userData = response.user;
        
        // Set profile image URL
        if (userData.profileimageurl) {
          setProfileImageUrl(userData.profileimageurl);
        }
        
        // Set reference images
        if (userData.referenceImages) {
          setReferenceImages(userData.referenceImages);
        }
        
        // FIXED: Handle musicGenres - ensure it's an array
        if (userData.musicGenres) {
          // If it's a string, parse it
          if (typeof userData.musicGenres === 'string') {
            try {
              const parsed = JSON.parse(userData.musicGenres);
              setMusicGenres(Array.isArray(parsed) ? parsed : []);
            } catch {
              setMusicGenres([]);
            }
          } else if (Array.isArray(userData.musicGenres)) {
            setMusicGenres(userData.musicGenres);
          } else {
            setMusicGenres([]);
          }
        }
        
        // Map API response to form values
        const formValues: Partial<ProfileFormData> = {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          gender: userData.gender || '',
          ageGroup: userData.ageGroup || '',
          ethnicity: userData.ethnicity || '',
          ethnicityOther: userData.ethnicityOther || '',
          paternalEthnicity: userData.paternalEthnicity || '',
          paternalEthnicityOther: userData.paternalEthnicityOther || '',
          maternalEthnicity: userData.maternalEthnicity || '',
          maternalEthnicityOther: userData.maternalEthnicityOther || '',
          siblingsCount: userData.siblingsCount || 0,
          siblings: userData.siblings || [],
          sameAsEarly: userData.sameAsEarly ?? null,
          earlyChildhood: {
            city: userData.earlyChildhood?.city || '',
            state: userData.earlyChildhood?.state || '',
            areaType: userData.earlyChildhood?.areaType || '',
            neighborhoodClass: userData.earlyChildhood?.neighborhoodClass || '',
            livingSpace: userData.earlyChildhood?.livingSpace || '',
            livingSpaceOther: userData.earlyChildhood?.livingSpaceOther || '',
          },
          lateChildhood: {
            city: userData.lateChildhood?.city || '',
            state: userData.lateChildhood?.state || '',
            areaType: userData.lateChildhood?.areaType || '',
            neighborhoodClass: userData.lateChildhood?.neighborhoodClass || '',
            livingSpace: userData.lateChildhood?.livingSpace || '',
            livingSpaceOther: userData.lateChildhood?.livingSpaceOther || '',
          },
          sameAsEarlyAdulthood: userData.sameAsEarlyAdulthood ?? null,
          earlyAdulthood: {
            city: userData.earlyAdulthood?.city || '',
            state: userData.earlyAdulthood?.state || '',
            areaType: userData.earlyAdulthood?.areaType || '',
            neighborhoodClass: userData.earlyAdulthood?.neighborhoodClass || '',
            livingSpace: userData.earlyAdulthood?.livingSpace || '',
            livingSpaceOther: userData.earlyAdulthood?.livingSpaceOther || '',
            maritalStatus: userData.earlyAdulthood?.maritalStatus || '',
          },
          lateAdulthood: {
            city: userData.lateAdulthood?.city || '',
            state: userData.lateAdulthood?.state || '',
            areaType: userData.lateAdulthood?.areaType || '',
            neighborhoodClass: userData.lateAdulthood?.neighborhoodClass || '',
            livingSpace: userData.lateAdulthood?.livingSpace || '',
            livingSpaceOther: userData.lateAdulthood?.livingSpaceOther || '',
            maritalStatus: userData.lateAdulthood?.maritalStatus || '',
          },
          shareStory: userData.shareStory || '',
          storyHighlight: {
            momentType: userData.storyHighlight?.momentType || '',
            momentOther: userData.storyHighlight?.momentOther || '',
            impactType: userData.storyHighlight?.impactType || '',
            impactOther: userData.storyHighlight?.impactOther || '',
          },
          profileimageurl: userData.profileimageurl || null,
        };

        // Set story locked if moment type exists
        if (userData.storyHighlight?.momentType) {
          setStoryLocked(true);
        }

        formik.setValues(formValues as ProfileFormData);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const validateSection = async (sectionIndex: number, fields: string[]): Promise<boolean> => {
    const touchedFields: any = {};
    fields.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (!touchedFields[parent]) {
          touchedFields[parent] = {};
        }
        touchedFields[parent][child] = true;
      } else {
        touchedFields[field] = true;
      }
    });
    
    formik.setTouched(touchedFields);
    const errors = await formik.validateForm();
    
    const hasSectionErrors = fields.some(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return !!(errors[parent as keyof typeof errors] as any)?.[child];
      }
      return !!errors[field as keyof typeof errors];
    });
    
    return !hasSectionErrors;
  };

  const handleSiblingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value) || 0;
    formik.setFieldValue('siblingsCount', count);
    
    const newSiblings: Sibling[] = Array.from({ length: count }, () => ({
      type: '',
      order: '',
    }));
    formik.setFieldValue('siblings', newSiblings);
  };

  const handleSiblingDetailChange = (
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    const siblings = [...(formik.values.siblings || [])];
    if (siblings[index]) {
      siblings[index] = { ...siblings[index], [field]: value };
      formik.setFieldValue('siblings', siblings);
    }
  };

  const handleSameAsEarlyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'Yes' ? true : e.target.value === 'No' ? false : null;
    formik.setFieldValue('sameAsEarly', value);
    
    if (value) {
      formik.setFieldValue('lateChildhood', {
        ...formik.values.earlyChildhood,
      });
    } else if (value === false) {
      formik.setFieldValue('lateChildhood', {
        city: '',
        state: '',
        areaType: '',
        neighborhoodClass: '',
        livingSpace: '',
        livingSpaceOther: '',
      });
    }
  };

  const handleSameAsEarlyAdulthoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'Yes' ? true : e.target.value === 'No' ? false : null;
    formik.setFieldValue('sameAsEarlyAdulthood', value);
    
    if (value) {
      formik.setFieldValue('lateAdulthood', {
        ...formik.values.earlyAdulthood,
      });
    } else if (value === false) {
      formik.setFieldValue('lateAdulthood', {
        city: '',
        state: '',
        areaType: '',
        neighborhoodClass: '',
        livingSpace: '',
        livingSpaceOther: '',
        maritalStatus: '',
      });
    }
  };

  const handleMomentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value && !storyLocked && value !== '') {
      const confirmLock = window.confirm(
        'Once selected, you cannot change this moment. Continue?'
      );
      
      if (confirmLock) {
        formik.setFieldValue('storyHighlight.momentType', value);
        setStoryLocked(true);
      }
    } else {
      formik.setFieldValue('storyHighlight.momentType', value);
    }
  };

  const handleImageChange = (field: string, file: File | null) => {
    formik.setFieldValue(field, file);
  };

  const handleRemoveImage = (field: string) => {
    formik.setFieldValue(field, null);
  };

  const handleProfileImageChange = (file: File | null) => {
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setProfileImageUrl(tempUrl);
      formik.setFieldValue('profileimageurl', file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImageUrl(null);
    formik.setFieldValue('profileimageurl', null);
  };

  const handleMusicGenreChange = (genre: string, checked: boolean) => {
    let updatedGenres: string[];
    if (checked) {
      updatedGenres = [...musicGenres, genre];
    } else {
      updatedGenres = musicGenres.filter(g => g !== genre);
    }
    // Filter out empty strings
    updatedGenres = updatedGenres.filter(g => g.trim() !== '');
    setMusicGenres(updatedGenres);
    formik.setFieldValue('musicGenres', updatedGenres);
  };

  const getFieldError = (
    fieldName: keyof ProfileFormData,
    sectionIndex: number,
    validationTriggered: { [key: number]: boolean }
  ): string | undefined => {
    if (!validationTriggered[sectionIndex]) return undefined;
    
    const touched = formik.touched[fieldName];
    const error = formik.errors[fieldName];
    
    return touched && error ? (typeof error === 'string' ? error : undefined) : undefined;
  };

  const getNestedFieldError = (
    parent: keyof typeof getNestedValues,
    child: string,
    sectionIndex: number,
    validationTriggered: { [key: number]: boolean }
  ): string | undefined => {
    if (!validationTriggered[sectionIndex]) return undefined;
    
    const touched = (formik.touched[parent] as any)?.[child];
    const error = (formik.errors[parent] as any)?.[child];
    
    return touched && error ? error : undefined;
  };

  return {
    formik,
    storyLocked,
    setStoryLocked,
    handleSiblingsChange,
    handleSiblingDetailChange,
    handleSameAsEarlyChange,
    handleSameAsEarlyAdulthoodChange,
    handleMomentSelect,
    handleImageChange,
    handleRemoveImage,
    handleProfileImageChange,
    handleRemoveProfileImage,
    handleMusicGenreChange,
    getFieldError,
    getNestedFieldError,
    isSubmitting,
    isLoading,
    isValid: formik.isValid,
    dirty: formik.dirty,
    resetForm: formik.resetForm,
    validateSection,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleSubmit: formik.handleSubmit,
    setFieldValue: formik.setFieldValue,
    getNestedValues,
    loadUserProfile,
    profileImageUrl,
    referenceImages,
    musicGenres,
  };
};