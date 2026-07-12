/**
 * =====================================================
 * DONATION SERVICE
 * =====================================================
 * Handles all Donation database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

const paystackService = require("./paystackService");
const {
  donationCheckoutSchema,
  donationCreateSchema,
  donationUpdateSchema,
  donationIdSchema,
  donationReferenceLookupSchema,
  getFieldErrors,
  getFirstError,
} = require("../utils/validation");
const {
  sanitize,
  sanitizeEmail,
} = require("../utils/sanitize");
const {
  validateFundMovementInput,
} = require("../utils/fundMovementValidation");

const DEFAULT_CURRENCY = "GHS";
const DEFAULT_PROVIDER = "PAYSTACK";

const parseOrThrow = (schema, payload) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const error = new Error(getFirstError(result.error));
    error.statusCode = 400;
    error.errors = getFieldErrors(result.error);
    throw error;
  }

  return result.data;
};

const buildDonationData = (data) => ({
  donorName: sanitize(data.donorName),
  email: sanitizeEmail(data.email),
  amount: data.amount,
  paymentStatus: data.paymentStatus || "PENDING",
  paymentReference: data.paymentReference
    ? sanitize(data.paymentReference)
    : null,
  paymentProvider: data.paymentProvider
    ? sanitize(data.paymentProvider)
    : DEFAULT_PROVIDER,
  currency: data.currency
    ? sanitize(data.currency).toUpperCase()
    : DEFAULT_CURRENCY,
  paidAt: data.paidAt ? new Date(data.paidAt) : undefined,
});

const buildDonationUpdateData = (data) => ({
  ...(data.donorName !== undefined
    ? { donorName: sanitize(data.donorName) }
    : {}),
  ...(data.email !== undefined
    ? { email: sanitizeEmail(data.email) }
    : {}),
  ...(data.amount !== undefined
    ? { amount: data.amount }
    : {}),
  ...(data.paymentStatus !== undefined
    ? {
        paymentStatus: data.paymentStatus,
      }
    : {}),
  ...(data.paymentReference !== undefined
    ? {
        paymentReference: data.paymentReference
          ? sanitize(data.paymentReference)
          : null,
      }
    : {}),
  ...(data.paymentProvider !== undefined
    ? {
        paymentProvider: sanitize(data.paymentProvider),
      }
    : {}),
  ...(data.currency !== undefined
    ? {
        currency: sanitize(data.currency).toUpperCase(),
      }
    : {}),
  ...(data.paidAt !== undefined
    ? {
        paidAt: data.paidAt
          ? new Date(data.paidAt)
          : null,
      }
    : {}),
});

const normalizeAmount = (amount) => Number(amount);

const finalizeDonationPayment = async ({
  donation,
  transaction,
}) => {
  const expectedAmount = Math.round(
    Number(donation.amount) * 100
  );
  const transactionAmount = Math.round(
    Number(transaction.amount)
  );

  if (transactionAmount !== expectedAmount) {
    const error = new Error(
      "Payment amount mismatch."
    );
    error.statusCode = 400;
    throw error;
  }

  return await prisma.donation.update({
    where: { id: donation.id },
    data: {
      paymentStatus: "COMPLETED",
      paymentProvider:
        donation.paymentProvider ||
        DEFAULT_PROVIDER,
      currency:
        transaction.currency ||
        donation.currency ||
        DEFAULT_CURRENCY,
      paidAt:
        donation.paidAt || new Date(),
    },
  });
};

/**
 * =====================================================
 * GET ALL DONATIONS
 * =====================================================
 */

const getAllDonations = async () => {
  try {
    return await prisma.donation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET DONATIONS ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET DONATION BY ID
 * =====================================================
 */

const getDonationById = async (id) => {
  try {
    const donationId = parseOrThrow(donationIdSchema, id);

    return await prisma.donation.findUnique({
      where: {
        id: donationId,
      },
    });
  } catch (error) {
    console.error(
      "GET DONATION ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE DONATION
 * =====================================================
 */

const createDonation = async (data) => {
  try {
    const donationData = parseOrThrow(
      donationCreateSchema,
      data
    );

    return await prisma.donation.create({
      data: buildDonationData(donationData),
    });
  } catch (error) {
    console.error(
      "CREATE DONATION ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE DONATION
 * =====================================================
 */

const updateDonation = async (
  id,
  data
) => {
  try {
    const donationId = parseOrThrow(donationIdSchema, id);
    const validatedDonationData = parseOrThrow(
      donationUpdateSchema,
      data
    );

    const donationData = {
      ...buildDonationUpdateData(validatedDonationData),
    };

    return await prisma.donation.update({
      where: {
        id: donationId,
      },
      data: donationData,
    });
  } catch (error) {
    console.error(
      "UPDATE DONATION ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DELETE DONATION
 * =====================================================
 */

const deleteDonation = async (
  id
) => {
  try {
    const donationId = parseOrThrow(donationIdSchema, id);

    return await prisma.donation.delete({
      where: {
        id: donationId,
      },
    });
  } catch (error) {
    console.error(
      "DELETE DONATION ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DONATION STATISTICS
 * =====================================================
 */

const getDonationStats = async () => {
  try {
    const donations =
      await prisma.donation.findMany();

    const totalAmount =
      donations.reduce(
        (
          sum,
          donation
        ) =>
          sum +
          Number(
            donation.amount
          ),
        0
      );

    const fundMovements =
      await prisma.$queryRaw`SELECT COALESCE(SUM("amount"), 0)::float AS "totalAmount" FROM "FundMovement"`;

    const totalWithdrawn = Number(fundMovements?.[0]?.totalAmount || 0);
    const availableAmount = Number(
      (totalAmount - totalWithdrawn).toFixed(2)
    );

    return {
      totalDonations:
        donations.length,
      totalAmount: availableAmount,
      totalRaisedAmount: Number(totalAmount.toFixed(2)),
      totalWithdrawn,
    };
  } catch (error) {
    console.error(
      "GET DONATION STATS ERROR:",
      error
    );
    throw error;
  }
};

const getAllFundMovements = async () => {
  try {
    return await prisma.fundMovement.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        occurredAt: "desc",
      },
    });
  } catch (error) {
    console.error("GET FUND MOVEMENTS ERROR:", error);
    throw error;
  }
};

const createFundMovement = async (data, user) => {
  try {
    const validated = validateFundMovementInput(data);

    if (!user?.id) {
      const error = new Error("Authentication required.");
      error.statusCode = 401;
      throw error;
    }

    const actor = await prisma.user.findUnique({
      where: { id: user.id },
      include: { role: true },
    });

    if (!actor) {
      const error = new Error("Authenticated user not found.");
      error.statusCode = 404;
      throw error;
    }

    const initiatedBy = `${actor.firstName} ${actor.lastName}`.trim() || actor.email;

    // ensure there is sufficient available amount before creating movement
    const available = await getAvailableAmount();
    if (Number(validated.amount) > Number(available)) {
      const error = new Error("Insignificant balance");
      error.statusCode = 400;
      throw error;
    }

    const movement = await prisma.fundMovement.create({
      data: {
        initiatedBy,
        amount: validated.amount,
        reason: validated.reason,
        occurredAt: validated.occurredAt,
        userId: user.id,
      },
    });

    return movement;
  } catch (error) {
    console.error("CREATE FUND MOVEMENT ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * INITIATE DONATION CHECKOUT
 * =====================================================
 */

const initiateDonationCheckout = async (
  data
) => {
  const donationData = parseOrThrow(
    donationCheckoutSchema,
    data
  );
  const amount = normalizeAmount(donationData.amount);

  const initializedTransaction =
    await paystackService.initializeTransaction(
      {
        email: sanitizeEmail(donationData.email),
        amount,
        callbackUrl: donationData.callbackUrl,
        metadata: {
          donorName: sanitize(donationData.donorName),
          email: sanitizeEmail(donationData.email),
          amount,
        },
      }
    );

  const donation =
    await prisma.donation.create({
      data: {
        donorName: sanitize(donationData.donorName),
        email: sanitizeEmail(donationData.email),
        amount,
        paymentStatus: "PENDING",
        paymentReference:
          initializedTransaction.reference,
        paymentProvider: DEFAULT_PROVIDER,
        currency:
          initializedTransaction.currency ||
          DEFAULT_CURRENCY,
      },
    });

  return {
    donation,
    authorizationUrl:
      initializedTransaction.authorizationUrl,
    reference:
      initializedTransaction.reference,
  };
};

/**
 * =====================================================
 * VERIFY DONATION PAYMENT
 * =====================================================
 */

const verifyDonationPayment = async (
  reference
) => {
  const paymentReference = parseOrThrow(
    donationReferenceLookupSchema,
    reference
  );

  const donation =
    await prisma.donation.findUnique({
      where: {
        paymentReference,
      },
    });

  if (!donation) {
    const error = new Error(
      "Donation payment record not found."
    );
    error.statusCode = 404;
    throw error;
  }

  if (donation.paymentStatus === "COMPLETED") {
    return donation;
  }

  const verification =
    await paystackService.verifyTransaction(
      reference
    );

  const transaction = verification.transaction;
  const isSuccessful =
    transaction.status === "success";

  if (!isSuccessful) {
    return await prisma.donation.update({
      where: { id: donation.id },
      data: {
        paymentStatus: "FAILED",
      },
    });
  }

  return await finalizeDonationPayment({
    donation,
    transaction,
  });
};

/**
 * =====================================================
 * HANDLE PAYSTACK WEBHOOK
 * =====================================================
 */

const handlePaystackWebhook = async ({
  payload,
  rawBody,
  signature,
}) => {
  const isValidSignature =
    paystackService.verifyWebhookSignature(
      rawBody,
      signature
    );

  if (!isValidSignature) {
    const error = new Error(
      "Invalid Paystack webhook signature."
    );
    error.statusCode = 401;
    throw error;
  }

  const eventType = payload?.event;
  const transaction = payload?.data;
  const reference = transaction?.reference;

  if (!reference) {
    const error = new Error(
      "Webhook payload missing payment reference."
    );
    error.statusCode = 400;
    throw error;
  }

  const donation =
    await prisma.donation.findUnique({
      where: {
        paymentReference: reference,
      },
    });

  if (!donation) {
    const error = new Error(
      "Donation payment record not found."
    );
    error.statusCode = 404;
    throw error;
  }

  if (eventType === "charge.success") {
    const verification =
      await paystackService.verifyTransaction(
        reference
      );

    const verifiedTransaction =
      verification.transaction;

    if (verifiedTransaction.status !== "success") {
      return await prisma.donation.update({
        where: { id: donation.id },
        data: { paymentStatus: "FAILED" },
      });
    }

    return await finalizeDonationPayment({
      donation,
      transaction: verifiedTransaction,
    });
  }

  if (eventType === "charge.failed") {
    return await prisma.donation.update({
      where: { id: donation.id },
      data: { paymentStatus: "FAILED" },
    });
  }

  return {
    ignored: true,
      paymentReference,
    event: eventType,
  };
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */
// exports moved to end of file to ensure functions are initialized before export

const getFundMovementById = async (id) => {
  try {
    return await prisma.fundMovement.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("GET FUND MOVEMENT ERROR:", error);
    throw error;
  }
};

const getAvailableAmount = async () => {
  const donations = await prisma.donation.findMany();
  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const fundMovements = await prisma.$queryRaw`SELECT COALESCE(SUM("amount"), 0)::float AS "totalAmount" FROM "FundMovement"`;
  const totalWithdrawn = Number(fundMovements?.[0]?.totalAmount || 0);
  return Number((totalAmount - totalWithdrawn).toFixed(2));
};

const updateFundMovement = async (id, data, user) => {
  try {
    const movementId = Number(id);

    const existing = await prisma.fundMovement.findUnique({ where: { id: movementId } });

    if (!existing) {
      const error = new Error("Fund movement not found.");
      error.statusCode = 404;
      throw error;
    }

    // only allow edits within 5 minutes
    const occurredAt = existing.occurredAt || existing.createdAt;
    const diff = Date.now() - new Date(occurredAt).getTime();
    const FIVE_MIN = 5 * 60 * 1000;
    if (diff > FIVE_MIN) {
      const error = new Error("Edit window expired. Withdrawals older than 5 minutes are read-only.");
      error.statusCode = 403;
      throw error;
    }

    const updateData = {};
    if (data.amount !== undefined) updateData.amount = Number(data.amount);
    if (data.reason !== undefined) updateData.reason = data.reason;

    const updated = await prisma.fundMovement.update({
      where: { id: movementId },
      data: updateData,
    });

    return updated;
  } catch (error) {
    console.error("UPDATE FUND MOVEMENT ERROR:", error);
    throw error;
  }
};

const printFundMovement = async (id) => {
  try {
    const movement = await getFundMovementById(id);
    if (!movement) {
      const error = new Error("Fund movement not found.");
      error.statusCode = 404;
      throw error;
    }

    const occurred = movement.occurredAt || movement.createdAt;
    const dateStr = new Date(occurred).toLocaleString();

    const pos = [];
    pos.push("C4PDMD - Withdrawal Receipt");
    pos.push("------------------------------");
    pos.push(`Amount: GH₵ ${Number(movement.amount).toFixed(2)}`);
    pos.push(`Reason: ${movement.reason || "-"}`);
    pos.push(`Recorded By: ${movement.initiatedBy || movement.user?.email || "-"}`);
    pos.push(`Date: ${dateStr}`);
    pos.push("------------------------------");
    pos.push("Thank you for supporting C4PDMD");

    return { movement, pos: pos.join("\n") };
  } catch (error) {
    console.error("PRINT FUND MOVEMENT ERROR:", error);
    throw error;
  }
};

module.exports = {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationStats,
  getAllFundMovements,
  createFundMovement,
  getFundMovementById,
  updateFundMovement,
  printFundMovement,
  getAvailableAmount,
  initiateDonationCheckout,
  verifyDonationPayment,
  handlePaystackWebhook,
};