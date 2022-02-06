# ioet-exercise

A project made to read worked hours from a person.

## How does it work?

Just put a text file with hours corresponding to the following pattern and it will output the total to be paid:

```
<NAME>=<WEEKDAY-ACRONYM><START HOURS HH:mm>-<END HOURS HH:mm>

WEEKDAY-ACRONYMS = MO, TU, WE, TH, FR, SA, SU
```

The rules are:
- The file must be a text file.
- The file must follow the pattern which were told.
- The start hours should be lower than the end hours.

If rules are broken it will result in errors, but do not worry, the interface will warn you! ^^

You can test it by yourself:
```
STEVE=MO10:00-12:00,TU10:00-12:00,TH02:00-07:00,SA15:00-18:00,SU20:00-22:00

expected output: The amount to pay STEVE is: 245 USD
```

### Okay, but how do I run your project?

You'll need:
- Node v14.17.X or superior;
- Yarn 1.22 or superior;
- A web browser (duh :p);

1. Download this project using git or downloading the source.
2. open the cmd at the root folder and execute `yarn` or `yarn install` to download the required dependencies.

To execute the project do:
```
yarn dev
```
It should available at `https://localhost:8080` or with a near available port.
<br>
<br>
To execute the tests do:
```
yarn test
```

To build this project do:
```
yarn build
```
It should output the final code at the `dist` folder, which will be created in the root folder.

## Technical details

## Architecture and related

I used an architecture aimed at `DDD` where the instructions describe the data, as well; the tests are also focused for these small functionalities. For it's behavior I used the `chain of responsability`, where I create pipelines to output a result.

For the structure, I choose a very friendly one (which are present on most `DDD` applications) where the folder names are related to it's responsabilities and functions.

### Some specific parts

For the `FileInput` component I used the `React.forwardRef` function so components which use this input as a child can access the `inputFile value` from it's `ref`.

For `toasters` and `work hours calcs.` I used the `React contexts` for split the responsabilities (cause the `WorkHours` component are not responsible to calculate it, but to render it, for example).

### Why not Typescript instead of Javascript?

Initially I thought of using `Typescript`, but I did not find it necessary, since it is a simple application and it doesn't need stronger typing language - but it would be easy to change if necessary.

### Tests!

I wrote some `unit tests` using the `jest library` for the functionalities of the application to give quality assurance for it, I did not made all of them cause some of the components have tests which I'm not that familiar with.

### Okay, did you copied any modules?

Nope. The `CSS animations`, the `toaster system`, the effects (etc) were all written by me, and they were not stolen from some existing module on the internet, but the Documentation for Jest and StackOverflow helped me a little with coding.