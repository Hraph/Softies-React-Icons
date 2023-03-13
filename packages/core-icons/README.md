# Softies React Icons

This is a collection of SVG icons adapted from the Softies icon set by Robbie Pearce, designed specifically for use with React. All icons defined in the `icons` directory are the work of Robbie Pearce. You can find more of his work at https://robbiepearce.com/softies.

## Installation

You can install the package using yarn:

```bash
yarn add @softies-react-icons/core
```

## Usage

To use an icon in your React project, simply import it from the `@softies-react-icons/core` directory and render it using a JSX component. For example:

```jsx
import { ArrowDownIcon } from '@softies-react-icons/core';

function MyComponent() {
  return (
    <div>
      <ArrowDownIcon width={16} height={16} />
    </div>
  );
}
```

The width and height props are optional, and will default to 24 if not specified. You can also pass additional props to the SVG element, such as className or style, to customize the appearance of the icon.

## License
This package is released under the Apache License, Version 2.0. The Softies icon set is the work of Robbie Pearce, and its license can be found at https://robbiepearce.com/softies/licence.