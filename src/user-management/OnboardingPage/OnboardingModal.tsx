/** @jsxImportSource @emotion/react */
import "twin.macro";
import {
  Button,
  FileInput,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "components";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { getCurrentUser } from "apollo/types/getCurrentUser";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components";
import { onboardVariables, onboard_onboardUser } from "apollo/types/onboard";

export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    currentUser {
      firstName
      lastName
    }
  }
`;

export const ONBOARD_USER_MUTATION = gql`
  mutation onboard($firstName: String!, $lastName: String!, $picture: Upload!) {
    onboardUser(
      input: { picture: $picture, firstName: $firstName, lastName: $lastName }
    ) {
      clientMutationId
    }
  }
`;

type OnboardingFormType = {
  picture: File;
  firstName: string;
  lastName: string;
};

const schema = yup.object().shape({
  picture: yup.mixed().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const OnboardingModal = () => {
  const currentUserQuery = useQuery<getCurrentUser>(CURRENT_USER_QUERY);
  const [onboardUser] = useMutation<onboard_onboardUser, onboardVariables>(
    ONBOARD_USER_MUTATION
  );

  const form = useForm<OnboardingFormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await onboardUser({
      variables: data,
    });
  });

  return currentUserQuery.data && currentUserQuery.data.currentUser ? (
    <Modal isOpen>
      <ModalHeader>Welcome to projectify!</ModalHeader>
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <ModalBody>
            <h4 tw="text-base text-dark mb-4">
              Before continuing, please confirm that these informations are
              valid
            </h4>
            <FormGroup>
              <Input
                type="text"
                name="firstName"
                label="firstName"
                defaultValue={currentUserQuery.data.currentUser.firstName}
                ref={form.register}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="lastName"
                label="lastName"
                ref={form.register}
                defaultValue={currentUserQuery.data.currentUser.lastName}
              />
            </FormGroup>
            <FormGroup tw="w-full justify-center">
              <FileInput
                name="picture"
                label="Profile picture"
                dropzone={{
                  accept: ["image/*"],
                  maxFiles: 1,
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Submit</Button>
          </ModalFooter>
        </form>
      </FormProvider>
    </Modal>
  ) : null;
};

export default OnboardingModal;
