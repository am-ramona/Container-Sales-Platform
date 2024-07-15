import React from 'react';
import { Button } from "../common/styles";

export default {
  title: 'Example/Button',
};

export const PrimaryBlue = () => <Button color="primary-blue"> Sample Button</Button>;
export const OutlineBlue = () => <Button color="outline-blue"> Sample Button</Button>;
export const PrimaryRed = () => <Button color="primary-red"> Sample Button</Button>;
export const OutlineRed = () => <Button color="outline-red"> Sample Button</Button>;
export const Disabled = () => <Button disabled color="disabled"> Sample Button</Button>;
