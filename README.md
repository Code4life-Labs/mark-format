# Mark Format
Reference from Markdown (Markdown Guide). This project help you to format a text with Mark (I named it "Markformat").
There are basic formats that availabel now.

In future, I'll publish this repo as a npm package.

## Support
- HTML: you will need this when you build a website with plain Javascript.
- React: Not support yet.
- React Native: Test on v0.70.5. It run well and I will improve it in future.
- Angular: Not support yet.

## Install
Not yet

## Format conventions
There are some MF with its format convention, I seperator them into 2 types, Low level MF and High level MF. All of them (Low level MF) except `Unordered list` and `Ordered list` will place the MF in head and tail of a text (without spacing between text and MF). MF of `Unordered list` and `Ordered list` should and will be placed only in head with a spacing like High level MF.

__Low level MF__:
This type of MF will apply only one format for text.

`Bold`: **

`Italic`: __

`Underline`: ~

`Line through`: ~~

`Unordered list`: -

`Ordered list`: 1., 2. ...

`Highlight`: ==

__High level MF__:
This type of MF will apply more than one format for text. Link and Image have a bit difference.
`Heading 0`: #

`Heading 1`: ##

`Heading 2`: ###

`Heading 3`: ####

`Heading 4`: #####

`Heading 5`: ######

`Sub 0`: #~

`Sub 1`: ##~

`Right align`: [>r]

`Center align`: [>c]

`Link`: `[Exmaple](https://example.com)`. I must wrap in "``" to show them.

`Image`: `![image.jpg](https://example.com/image.jpg)`. I must wrap in "``" to show them.

`Block quote`: >

## Usage
I'll update for HTML and React Native.
