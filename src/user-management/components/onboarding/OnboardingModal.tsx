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
  Form,
  FormLabel,
  FormRow,
} from "components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { getCurrentUser_currentUser } from "apollo/types/getCurrentUser";
import { UserStatus } from "apollo/types/globalTypes";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components";
import { onboard, onboardVariables } from "apollo/types/onboard";
import mapViolationsToForm from "utils/mapViolationsToForm";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ONBOARD_USER_MUTATION = gql`
  mutation onboard($firstName: String!, $lastName: String!, $picture: Upload!) {
    onboardUser(
      input: { picture: $picture, firstName: $firstName, lastName: $lastName }
    ) {
      user {
        id
        status
        profilePictureUrl
      }
    }
  }
`;

type OnboardingFormType = {
  picture: File;
  firstName: string;
  lastName: string;
};

type OnboardingModalProps = {
  user: getCurrentUser_currentUser;
};

const schema = yup.object().shape({
  picture: yup.mixed().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const OnboardingModal = ({ user }: OnboardingModalProps) => {
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const { t } = useTranslation();
  const form = useForm<OnboardingFormType>({
    resolver: yupResolver(schema),
  });

  const [onboardUser] = useMutation<onboard["onboardUser"], onboardVariables>(
    ONBOARD_USER_MUTATION,
    {
      onError: (e) => {
        /* istanbul ignore else */
        if (!mapViolationsToForm<OnboardingFormType>(form.setError, e)) {
          toast.error(
            e.graphQLErrors?.[0].extensions?.["exception_code"] === 4203
              ? t(
                  "usermanagement.onboarding.modal.error.user_already_onboarded"
                )
              : t("global.errors.internal-server-error")
          );
        }
      },
      onCompleted: () => {
        toast.success(t("usermanagement.onboarding.modal.user_onboarded"));
      },
    }
  );

  const onSubmit = form.handleSubmit(async (data) => {
    await onboardUser({
      variables: data,
    });
  });

  const onDrop = (accepted: File[]) => {
    /* istanbul ignore else */
    if (accepted.length > 0) {
      setProfilePicturePreview(URL.createObjectURL(accepted[0]));
    } else {
      setProfilePicturePreview(null);
    }
  };

  return (
    <Modal isOpen={user.status !== UserStatus.ONBOARDED}>
      <ModalHeader>{t("usermanagement.onboarding.modal.title")}</ModalHeader>
      <FormProvider {...form}>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormRow>
              <FormGroup>
                <h4 tw="text-base text-dark">
                  {t("usermanagement.onboarding.modal.introduction_text")}
                </h4>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>
                  {t("usermanagement.onboarding.modal.form.label_firstName")}
                </FormLabel>
                <Input
                  type="text"
                  readOnly={user.status === UserStatus.SIGNED_UP}
                  defaultValue={user.firstName}
                  {...form.register("firstName")}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  {t("usermanagement.onboarding.modal.form.label_lastName")}
                </FormLabel>
                <Input
                  type="text"
                  {...form.register("lastName")}
                  readOnly={user.status === UserStatus.SIGNED_UP}
                  defaultValue={user.lastName}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>
                  {t("usermanagement.onboarding.modal.form.label_picture")}
                </FormLabel>
                <div tw="flex">
                  <div tw="w-2/3 mr-4">
                    <FileInput
                      name="picture"
                      dropzone={{
                        accept: ["image/jpeg", "image/png"],
                        maxFiles: 1,
                        onDrop,
                      }}
                    />
                  </div>
                  <div tw="flex flex-col items-center mt-2 flex-grow-0 w-1/3">
                    <p tw="text-sm">
                      {t(
                        "usermanagement.onboarding.modal.form.picture_preview"
                      )}
                    </p>
                    {profilePicturePreview && (
                      <img
                        src={profilePicturePreview}
                        alt="profile-preview"
                        tw="h-20 w-20 mt-2 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </FormGroup>
            </FormRow>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              data-testid="onboarding-modal-submit"
              disabled={form.formState.isSubmitting}
            >
              {t("usermanagement.onboarding.modal.form.btn_submit")}
            </Button>
          </ModalFooter>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default OnboardingModal;
