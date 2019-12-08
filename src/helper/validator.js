const validateRequest = ({ email, name }) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const validEmail =  regexEmail.test(email);
  if (!email || typeof email !== 'string' || !validEmail) {
    return false;
  } else if (typeof name === 'string' && validEmail) {
    return { email, name };
  }
};

export default validateRequest;