// utils/yupSchemas.ts
import * as yup from "yup";
import { VALIDATION_MESSAGES } from "./validationMessages";

// Login validation
export const emailSchema = yup
  .string()
  .email(VALIDATION_MESSAGES.EMAIL_INVALID)
  .required(VALIDATION_MESSAGES.EMAIL_REQUIRED);

export const oldPasswordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.OLD_PASSWORD_REQUIRED);

export const newPasswordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.NEW_PASSWORD_REQUIRED);

export const passwordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED);

// Confirm password validation
export const confirmPasswordSchema = yup
  .string()
  .trim()
  .required(VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
  .when("password_new", {
    is: (password_new: string) => !!password_new,
    then: (schema) =>
      schema
        .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
        .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
        .oneOf([yup.ref("password_new")], VALIDATION_MESSAGES.PASSWORD_MATCH),
  });

// My account validation
export const fnameSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.FIRST_NAME);

export const lnameSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.LAST_NAME);

export const genderSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.GENDER_REQUIRED);

export const ageGroupSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.AGE_GROUP_REQUIRED);

export const ethnicitySchema = yup
  .string()
  .nullable();

export const citySchema = yup
  .string()
  .trim()
  .required(VALIDATION_MESSAGES.CITY_REQUIRED);

export const stateSchema = yup
  .string()
  .trim()
  .required(VALIDATION_MESSAGES.STATE_REQUIRED);

/* ================= NESTED SCHEMAS (MATCH MONGODB) ================= */

// UPDATED: Sibling schema with gender instead of type
export const siblingSchema = yup.object({
  gender: yup
    .string()
    .required(VALIDATION_MESSAGES.SIBLING_GENDER_REQUIRED),
  order: yup
    .string()
    .required(VALIDATION_MESSAGES.SIBLING_ORDER_REQUIRED),
});

// Life stage schema (used for childhood and adulthood stages)
export const lifeStageSchema = yup.object({
  city: yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.CITY_REQUIRED),
  state: yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.STATE_REQUIRED),
  areaType: yup
    .string()
    .nullable(),
  neighborhoodClass: yup
    .string()
    .nullable(),
  livingSpace: yup
    .string()
    .nullable(),
  livingSpaceOther: yup
    .string()
    .when('livingSpace', {
      is: (val: string) => val === 'Other',
      then: (schema) => schema.required(VALIDATION_MESSAGES.LIVING_SPACE_OTHER_REQUIRED),
      otherwise: (schema) => schema.nullable(),
    }),
  maritalStatus: yup
    .string()
    .nullable(),
});

// Conditional life stage schema (for when "Same as" is selected)
export const conditionalLifeStageSchema = (isRequired: boolean) => {
  if (isRequired) {
    return yup.object({
      city: yup
        .string()
        .trim()
        .required(VALIDATION_MESSAGES.CITY_REQUIRED),
      state: yup
        .string()
        .trim()
        .required(VALIDATION_MESSAGES.STATE_REQUIRED),
      areaType: yup.string().nullable(),
      neighborhoodClass: yup.string().nullable(),
      livingSpace: yup.string().nullable(),
      livingSpaceOther: yup.string().when('livingSpace', {
        is: (val: string) => val === 'Other',
        then: (schema) => schema.required(VALIDATION_MESSAGES.LIVING_SPACE_OTHER_REQUIRED),
        otherwise: (schema) => schema.nullable(),
      }),
      maritalStatus: yup.string().nullable(),
    });
  }
  
  return yup.object({
    city: yup.string().nullable(),
    state: yup.string().nullable(),
    areaType: yup.string().nullable(),
    neighborhoodClass: yup.string().nullable(),
    livingSpace: yup.string().nullable(),
    livingSpaceOther: yup.string().nullable(),
    maritalStatus: yup.string().nullable(),
  });
};

// Story highlight schema
export const storyHighlightSchema = yup.object({
  momentType: yup
    .string()
    .when('$shareStory', {
      is: (shareStory: string) => shareStory === 'Yes',
      then: (schema) => schema.required(VALIDATION_MESSAGES.MOMENT_REQUIRED),
      otherwise: (schema) => schema.nullable(),
    }),
  momentOther: yup
    .string()
    .when(['$shareStory', 'momentType'], {
      is: (shareStory: string, momentType: string) => 
        shareStory === 'Yes' && momentType === 'Other',
      then: (schema) => schema.required(VALIDATION_MESSAGES.MOMENT_OTHER_REQUIRED),
      otherwise: (schema) => schema.nullable(),
    }),
  impactType: yup
    .string()
    .when('$shareStory', {
      is: (shareStory: string) => shareStory === 'Yes',
      then: (schema) => schema.required(VALIDATION_MESSAGES.IMPACT_REQUIRED),
      otherwise: (schema) => schema.nullable(),
    }),
  impactOther: yup
    .string()
    .when(['$shareStory', 'impactType'], {
      is: (shareStory: string, impactType: string) => 
        shareStory === 'Yes' && impactType === 'Other',
      then: (schema) => schema.required(VALIDATION_MESSAGES.IMPACT_OTHER_REQUIRED),
      otherwise: (schema) => schema.nullable(),
    }),
});

/* ================= COMPLETE PROFILE SCHEMA ================= */

// Main profile schema that combines all nested schemas
export const profileSchema = yup.object({
  // Basic Information
  firstName: fnameSchema,
  lastName: lnameSchema,
  email: emailSchema,
  gender: genderSchema,
  ageGroup: ageGroupSchema,
  ethnicity: ethnicitySchema,
  ethnicityOther: yup.string().nullable(),
  paternalEthnicity: ethnicitySchema,
  paternalEthnicityOther: yup.string().nullable(),
  maternalEthnicity: ethnicitySchema,
  maternalEthnicityOther: yup.string().nullable(),
  
  // Music Genres
  musicGenres: yup.array().of(yup.string()).nullable(),
  
  // Siblings - UPDATED: Using updated siblingSchema with gender
  siblingsCount: yup
    .number()
    .min(0)
    .max(5)
    .nullable(),
  siblings: yup
    .array()
    .of(siblingSchema)
    .when('siblingsCount', {
      is: (count: number) => count > 0,
      then: (schema) => schema.min(1),
      otherwise: (schema) => schema.nullable(),
    }),

  // Childhood
  sameAsEarly: yup.boolean().nullable(),
  earlyChildhood: lifeStageSchema,
  lateChildhood: yup
    .mixed()
    .when('sameAsEarly', {
      is: false,
      then: () => lifeStageSchema,
      otherwise: () => yup.object().nullable(),
    }),

  // Adulthood
  sameAsEarlyAdulthood: yup.boolean().nullable(),
  earlyAdulthood: lifeStageSchema.shape({
    maritalStatus: yup.string().nullable(),
  }),
  lateAdulthood: yup
    .mixed()
    .when('sameAsEarlyAdulthood', {
      is: false,
      then: () => lifeStageSchema.shape({
        maritalStatus: yup.string().nullable(),
      }),
      otherwise: () => yup.object().nullable(),
    }),

  // Story Highlight
  shareStory: yup
    .string()
    .required(VALIDATION_MESSAGES.SHARE_STORY_REQUIRED),
  storyHighlight: storyHighlightSchema,

  // Profile Image
  profileimageurl: yup.mixed().nullable(),

  // Reference Images
  earlyChildhoodImage: yup.mixed().nullable(),
  lateChildhoodImage: yup.mixed().nullable(),
  earlyAdulthoodImage: yup.mixed().nullable(),
  lateAdulthoodImage: yup.mixed().nullable(),
});

// Type inference from schema
export type ProfileFormData = yup.InferType<typeof profileSchema>;

/* ================= HELPER FUNCTIONS ================= */

// Function to validate a single field
export const validateField = async (
  schema: yup.AnySchema,
  value: any,
  context?: object
) => {
  try {
    await schema.validate(value, { context });
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

// Function to create conditional validation based on form state
export const createConditionalValidator = (
  condition: (values: any) => boolean,
  schema: yup.AnySchema
) => {
  return yup.mixed().when('$values', {
    is: (values: any) => condition(values),
    then: () => schema,
    otherwise: () => yup.mixed().nullable(),
  });
};