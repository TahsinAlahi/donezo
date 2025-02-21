function passwordValidator(password) {
  const minLength = 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= minLength;

  return isLongEnough && hasUppercase && hasLowercase;
}

export default passwordValidator;
