/**
 * App.test.jsx
 * Test file for App component
 */

// Node Modules
import renderer from 'react-test-renderer';

// Components
import App from '../src/App';
import Provider from '../src/Provider';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider>
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
