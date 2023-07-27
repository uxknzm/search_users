import { render, screen } from '@testing-library/react';
import App from './App';
import Profile from './component/Profile';
import Users from './component/Users';
import { createRenderer } from 'react-dom/test-utils';
import InputContainer from './component/InputContainer';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("profile", () => {
  const profile = createRenderer(<Profile />).toJSON();
  expect(profile).toMatchSnapshot();
});

test("fetch users", () => {
  const users = createRenderer(<Users />).toJSON();
  expect(users).toMatchSnapshot();
});

test("ipunt", () => {
  const input = createRenderer(<InputContainer />).toJSON();
  expect(input).toMatchSnapshot();
});



