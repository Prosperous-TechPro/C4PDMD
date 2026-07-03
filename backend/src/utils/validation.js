/**
 * =====================================================
 * VALIDATION HELPERS
 * =====================================================
 */

const { z } = require("zod");

const donorNameSchema = z
  .string()
  .trim()
  .min(2, "Donor name must be at least 2 characters")
  .max(100, "Donor name must be less than 100 characters")
  .regex(
    /^[a-zA-Z\s\-'.]+$/,
    "Donor name can only contain letters, spaces, hyphens, apostrophes and dots"
  );

const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(254, "Email must be less than 254 characters")
  .transform((value) => value.toLowerCase());

const amountSchema = z
  .coerce.number()
  .finite("Amount must be a valid number")
  .positive("Amount must be greater than 0")
  .max(9999999999.99, "Amount is too large")
  .transform((value) => Math.round(value * 100) / 100);

const paymentStatusSchema = z.enum([
  "PENDING",
  "COMPLETED",
  "FAILED",
]);

const paymentReferenceSchema = z
  .string()
  .trim()
  .min(1, "Payment reference is required")
  .max(255, "Payment reference is too long");

const paymentProviderSchema = z
  .string()
  .trim()
  .min(2, "Payment provider is required")
  .max(50, "Payment provider is too long");

const currencySchema = z
  .string()
  .trim()
  .length(3, "Currency must be a 3-letter ISO code")
  .transform((value) => value.toUpperCase());

const callbackUrlSchema = z
  .string()
  .trim()
  .url("Please enter a valid callback URL")
  .max(2048, "Callback URL is too long");

const donationCheckoutSchema = z.object({
  donorName: donorNameSchema,
  email: emailSchema,
  amount: amountSchema,
  callbackUrl: callbackUrlSchema.optional(),
});

const donationCreateSchema = z.object({
  donorName: donorNameSchema,
  email: emailSchema,
  amount: amountSchema,
  paymentStatus: paymentStatusSchema.optional(),
  paymentReference: paymentReferenceSchema.optional().nullable(),
  paymentProvider: paymentProviderSchema.optional(),
  currency: currencySchema.optional(),
  paidAt: z.coerce.date().optional().nullable(),
});

const donationUpdateSchema = donationCreateSchema
  .partial()
  .refine(
    (data) => Object.values(data).some((value) => value !== undefined),
    {
      message: "At least one field must be provided.",
    }
  );

const donationIdSchema = z
  .coerce.number()
  .int("Donation ID must be a whole number")
  .positive("Donation ID must be greater than 0");

const donationReferenceLookupSchema = paymentReferenceSchema;

const getFirstError = (error) => {
  return error.issues[0]?.message || "Validation failed";
};

const getFieldErrors = (error) => {
  const errors = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join(".");

    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return errors;
};

module.exports = {
  donorNameSchema,
  emailSchema,
  amountSchema,
  paymentStatusSchema,
  paymentReferenceSchema,
  paymentProviderSchema,
  currencySchema,
  callbackUrlSchema,
  donationCheckoutSchema,
  donationCreateSchema,
  donationUpdateSchema,
  donationIdSchema,
  donationReferenceLookupSchema,
  getFirstError,
  getFieldErrors,
};