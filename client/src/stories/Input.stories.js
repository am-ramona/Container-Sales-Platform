import React from 'react';
import { Input, Checkbox, Select } from "../common/styles";

export default {
  title: 'Example/Input',
};

export const Text = () => <Input />;

export const TextDisabled = () => <Input disabled />;

export const SelectInput = () => <Select><option>Item 1</option> <option>Item 2</option> </Select>;

export const SelectDisabled = () => <Select disabled><option>Item 1</option> <option>Item 2</option> </Select>;

export const Check = () => <Checkbox />

export const CheckDisabled = () => <Checkbox disabled />

export const Slider = () => <input type="range" />