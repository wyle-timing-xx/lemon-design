import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@lemon-design/core';
import { Button } from '@lemon-design/core';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    subtitle: {
      control: { type: 'text' },
    },
    bordered: {
      control: { type: 'boolean' },
    },
    shadow: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'This is a basic card with some content.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title.',
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle for the card',
    children: 'This card has both a title and subtitle.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'This card includes action buttons',
    actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
    children: 'This card has action buttons in the header.',
  },
};

export const NoBorder: Story = {
  args: {
    title: 'Card without Border',
    bordered: false,
    children: 'This card has no border.',
  },
};

export const NoShadow: Story = {
  args: {
    title: 'Card without Shadow',
    shadow: false,
    children: 'This card has no shadow.',
  },
};

export const ComplexContent: Story = {
  args: {
    title: 'User Profile',
    subtitle: 'Manage your account settings',
    actions: (
      <Button size="sm" variant="outline">Edit</Button>
    ),
    children: (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">JD</span>
          </div>
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <p className="text-sm text-gray-900">John</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <p className="text-sm text-gray-900">Doe</p>
          </div>
        </div>
      </div>
    ),
  },
};
