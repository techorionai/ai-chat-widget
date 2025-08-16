import { UseQueryResult } from "@tanstack/react-query";
import { DataOrError } from "../types/mainProcess";
import { Container, Center, Loader, Text } from "@mantine/core";

interface Result<T> {
  component: React.ReactNode;
  hasError: boolean;
  data: T | null;
}

const getQueryDataOrError = <T,>(
  useQueryResult: UseQueryResult<DataOrError<T>, Error>
): Result<T> => {
  const result: Result<T> = {
    component: null,
    hasError: false,
    data: null,
  };

  const UNEXPECTED_ERROR = "An unexpected error occurred.";

  if (!useQueryResult.data) {
    result.component = (
      <Container>
        <Text c="red">{UNEXPECTED_ERROR}</Text>
      </Container>
    );
    result.hasError = true;
  }

  if (
    useQueryResult.data &&
    "loading" in useQueryResult.data &&
    useQueryResult.data.loading
  ) {
    result.component = (
      <Center py="xl">
        <Loader />
      </Center>
    );
    return result;
  }

  if (useQueryResult.data && "error" in useQueryResult.data) {
    result.component = (
      <Container>
        <Text c="red">{useQueryResult.data.error}</Text>
      </Container>
    );
    result.hasError = true;
  }

  if (
    (useQueryResult.data && !("data" in useQueryResult.data)) ||
    !useQueryResult.data
  ) {
    result.component = (
      <Container>
        <Text c="red">{UNEXPECTED_ERROR}</Text>
      </Container>
    );
    result.hasError = true;
  }

  result.data =
    useQueryResult.data && "data" in useQueryResult.data
      ? useQueryResult.data?.data ?? null
      : null;

  return result;
};

export default getQueryDataOrError;
