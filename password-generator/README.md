# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


Features : As soon the app loads, input will contain a random password of length eight characters

Every time you click the refresh button (icon) it will generate a new password

When you click the copy button, it will copy the password into the clipboard, and copy button text will be copied for 1 second, see the demo app for a better understanding

Users will be able to check or uncheck uppercase, lowercase, number, and special characters checkboxes

a. Uppercase letters: ABCDEFGHIJKLMNOPQRSTUVWXYZ

b. Lowercase letters: abcdefghijklmnopqrstuvwxyz

c. Numbers: 0123456789

d. Special Characters: !@#$%^&*()
If the user unchecked all checkboxes, the lowercase checkbox will become a tick (checked) automatically, for a better understanding play with the demo app

If password length is less than 8, the password strength message (below password input) will be “Too short”, and the color will be Red

You also have to write password strength logic, password strength will show below password input (below logic will be applicable if password length is equal to greater or than 8).

a. Hard: password contains at least one uppercase, one lowercase, one number, and one special character

b. Medium: if one of the fields is missing in the password

c. Easy: if two of the fields are missing in the password

Different colors should represent the password strength; you can find color HEX codes in variables.css and utility classes in styles.css file

a. Weak: Red

b. Medium: Orange

c. Hard: Green