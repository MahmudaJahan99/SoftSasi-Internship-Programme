type Rule = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const passwordRules: Rule[] = [
  { id: "length", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { id: "lowercase", label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { id: "uppercase", label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { id: "digit", label: "One number", test: (pw) => /[0-9]/.test(pw) },
  { id: "special", label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export const isPasswordValid = (password: string) =>
  passwordRules.every((rule) => rule.test(password));

export const PASSWORD_REQUIREMENTS_MESSAGE =
  "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";