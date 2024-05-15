import { Combobox as ComboboxPrimitive } from 'bits-ui';

import Item from './combobox-item.svelte';
import Separator from './combobox-separator.svelte';
import Content from './combobox-content.svelte';
import Input from './combobox-input.svelte';

const Root = ComboboxPrimitive.Root;
const Group = ComboboxPrimitive.Group;
const Label = ComboboxPrimitive.Label;

export {
  Root,
  Group,
  Input,
  Item,
  Content,
  Separator,
  Label,
  //
  Root as Combobox,
  Group as ComboboxGroup,
  Input as ComboboxInput,
  Item as ComboboxItem,
  Content as ComboboxContent,
  Separator as ComboboxSeparator,
  Label as ComboboxLabel
};
