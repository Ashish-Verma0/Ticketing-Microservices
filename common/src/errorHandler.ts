const createError = (status: number, message: string): Error => {
  const err = new Error(message);
  (err as any).status = status;
  return err;
};

export default createError;
