import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@lemon-design/core';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Name',
    defaultValue: 'John Doe',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    helperText: 'Choose a unique username',
    placeholder: 'Enter username',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    error: true,
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    defaultValue: 'This is disabled',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" label="Small" placeholder="Small size" />
      <Input size="md" label="Medium" placeholder="Medium size" />
      <Input size="lg" label="Large" placeholder="Large size" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
      <Input variant="standard" label="Standard" placeholder="Standard variant" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <h3 className="text-lg font-semibold">Contact Form</h3>
      <Input
        label="First Name"
        placeholder="Enter your first name"
        required
      />
      <Input
        label="Last Name"
        placeholder="Enter your last name"
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll never share your email"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
      />
      <Input
        label="Message"
        multiline
        rows={4}
        placeholder="Enter your message"
        helperText="Tell us about your project"
      />
    </div>
  ),
};
