const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const strongPasswordMessage =
  "Password must be at least 8 characters and include uppercase, lowercase, number and special character";

const isStrongPassword = (password) =>
  strongPasswordPattern.test(password || "");

module.exports = {
  strongPasswordPattern,
  strongPasswordMessage,
  isStrongPassword,
};