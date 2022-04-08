import { ApolloError, isApolloError } from "@apollo/client";

export function getErrorMessage(error: ApolloError | Error): string {
  if (!isApolloError(error)) return error.message;
  const defaultMessage = error.message || "Something went wrong";
  const { graphQLErrors } = error;
  const [firstError] = graphQLErrors;
  const { extensions = {} } = firstError;
  const { exception = {} } = extensions;
  const { validationErrors = [] } = exception as any;
  const [firstValidationError = {}] = validationErrors as Array<any>;
  const { constraints = {} } = firstValidationError;
  const [validationMessage] = Object.values(constraints) as Array<string>;

  return validationMessage || defaultMessage;
}
