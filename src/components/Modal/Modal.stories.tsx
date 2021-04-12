/** @jsxImportSource @emotion/react */
import { ComponentProps, useState } from "react";
import Modal from "./Modal";
import { Story } from "@storybook/react";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import { Button } from "components";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Modal",
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
  argTypes: {
    isOpen: {
      control: true,
    },
    onClose: {
      control: false,
    },
  },
};

const Template: Story<ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open the modal</button>
      <Modal {...args} onClose={() => setOpen(false)} isOpen={isOpen}>
        <ModalHeader onClose={() => setOpen(false)}>
          Welcome to my modal!
        </ModalHeader>
        <ModalBody>
          <h5>You can put your content here</h5>
          <p>And any content!</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const Default = Template.bind({});
