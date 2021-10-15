export default (): Record<string, any> => ({
  PORT: process.env.PAYMENT_SERVICE_PORT,
  HOST: process.env.PAYMENT_SERVICE_HOST,
});
