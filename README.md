# cj.form-mirroring.js
Simple library to mirror content from one element to another.

## Basic usage
To mirror content, simply add a `data-mirror `attribute to an element, with the name of the element you wish to mirro content to.

`<input type="text" name="test" value="dog" data-mirror="[SELECTOR]" />`

or

`<div name="test" data-mirror="[SELECTOR]">dog</div>`

**Selector**: Use either Id or Classname, i.e. #myField, .myField


**Optional Attributes**

data-format [*currency* | *percentage*]

Currency: Converts data to a currency.


Percentage: Converts data to a percentage.
