# Softies React Icons - Custom

This is a collection of custom SVG icons, designed specifically for use with React.

## Installation

You can install the package using yarn:

```bash
yarn add @softies-react-icons/custom
```

## Usage

To use an icon in your React project, simply import it from the `@softies-react-icons/custom` directory and render it using a JSX component. For example:

```jsx
import { AddressesIcon } from '@softies-react-icons/custom';

function MyComponent() {
  return (
    <div>
      <AddressesIcon width={16} height={16} />
    </div>
  );
}
```

The width and height props are optional, and will default to 24 if not specified. You can also pass additional props to the SVG element, such as className or style, to customize the appearance of the icon.

## License
This package is released under the Apache License, Version 2.0.