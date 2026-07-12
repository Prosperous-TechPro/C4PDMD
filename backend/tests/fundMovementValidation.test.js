const test = require('node:test');
const assert = require('node:assert/strict');

const { validateFundMovementInput } = require('../src/utils/fundMovementValidation');

test('validateFundMovementInput normalizes amount, reason and timestamp without requiring a name', () => {
  const payload = validateFundMovementInput({
    amount: '150.50',
    reason: '  School supplies  ',
  });

  assert.equal(payload.amount, 150.5);
  assert.equal(payload.reason, 'School supplies');
  assert.equal(typeof payload.occurredAt, 'string');
});

test('validateFundMovementInput rejects missing required fields', () => {
  assert.throws(() => validateFundMovementInput({ amount: '10' }), /Reason for the withdrawal or use is required/i);
  assert.throws(() => validateFundMovementInput({ reason: 'Purchase' }), /Amount must be a positive number/i);
  assert.throws(() => validateFundMovementInput({ amount: '0' }), /Amount must be a positive number/i);
});
