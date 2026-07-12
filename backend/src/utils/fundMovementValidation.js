const sanitizeText = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

const validateFundMovementInput = (payload = {}) => {
  const reason = sanitizeText(payload.reason);
  const amount = Number(payload.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    const error = new Error('Amount must be a positive number.');
    error.statusCode = 400;
    throw error;
  }

  if (!reason) {
    const error = new Error('Reason for the withdrawal or use is required.');
    error.statusCode = 400;
    throw error;
  }

  return {
    amount: Number(amount.toFixed(2)),
    reason,
    occurredAt: new Date().toISOString(),
  };
};

module.exports = {
  validateFundMovementInput,
};
