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
import { TextField } from "modules/core";
import { FormProvider, useForm } from "react-hook-form";
import mapViolationsToForm from "utils/mapViolationsToForm";
import * as yup from "yup";
import { LIST_PROJECTS_PAGE_QUERY } from "../../ListProjectsPage";

export const CREATE_PROJECT_MUATION = gql`
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

  const [createProject] = useCreateProjectMutation({
    onError: (e) => {
      mapViolationsToForm(form.setError, e);
    },
    onCompleted: () => {
      onClose();
      form.reset();
    },
    refetchQueries: [LIST_PROJECTS_PAGE_QUERY],
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await createProject({ variables: values });
    form.reset();
    onClose();
  });

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Create a new project</DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Project name"
                fullWidth
                variant="outlined"
                required
                {...form.register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Project description"
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
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={onSubmit}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectFormDialog;
