import { gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useCreateProjectMutation } from "generated/graphql";
import { TextField, usePaginationMethods } from "modules/core";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import mapViolationsToForm from "utils/mapViolationsToForm";
import * as yup from "yup";

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($name: String!, $description: String) {
    createProject(input: { name: $name, description: $description }) {
      clientMutationId
    }
  }
`;

type ProjectFormFields = {
  name: string;
  description: string | undefined;
};

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});

type ProjectFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ProjectFormDialog = ({ open, onClose }: ProjectFormDialogProps) => {
  const form = useForm<ProjectFormFields>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { t } = useTranslation();
  const { resetPagination } = usePaginationMethods();

  const [createProject] = useCreateProjectMutation({
    onError: (e) => {
      mapViolationsToForm(form.setError, e);
    },
    onCompleted: () => {
      resetPagination();
      onClose();
      form.reset();
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await createProject({ variables: values });
    form.reset();
    onClose();
  });

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t("project-management.list_projects_page.project_form_dialog.title")}
      </DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label={t(
                  "project-management.list_projects_page.project_form_dialog.label_name"
                )}
                fullWidth
                variant="outlined"
                required
                {...form.register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label={t(
                  "project-management.list_projects_page.project_form_dialog.label_description"
                )}
                fullWidth
                variant="outlined"
                rows={10}
                multiline
                {...form.register("description")}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
          disabled={form.formState.isSubmitting}
        >
          {t("global.controls.btn_cancel")}
        </Button>
        <Button
          color="primary"
          onClick={onSubmit}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t("global.controls.btn_save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectFormDialog;
