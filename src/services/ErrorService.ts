export const LogError = ({
  status,
  message,
}: {
  status: number;
  message: string;
}) => {
  console.error(`${status}: ${message}`);
};
