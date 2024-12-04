import { render, screen, waitFor } from '@testing-library/react';
import ResourcePage from '../src/pages/ResourcePage'; // Adjust the import path as needed
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Mocking the API SDK
vi.mock('../src/api/apiSdk', () => ({
  default: vi.fn(() => ({
    getAllResources: vi.fn(() =>
      Promise.resolve([
        {
          _id: '1',
          category: 'Finance',
          content: 'How to identify financial scams',
          links: ['https://example.com/finance'],
          image: '',
        },
        {
          _id: '2',
          category: 'Tech',
          content: 'Common tech scam tactics',
          links: ['https://example.com/tech'],
          image: '',
        },
      ])
    ),
  })),
}));

// Create a mock Redux store
const mockStore = configureStore();

describe('ResourcePage', () => {
  it('shows a spinner while resources are loading', () => {
    // Set up mock Redux state
    const initialState = { session: { token: 'mock-token' } };
    const store = mockStore(initialState);

    // Render ResourcePage inside MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <ResourcePage />
        </MemoryRouter>
      </Provider>
    );

    // Expect the spinner to be in the document
    const spinner = screen.getByTestId('fullscreen-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders the correct number of ResourceBox components after loading', async () => {
    // Set up mock Redux state
    const initialState = { session: { token: 'mock-token' } };
    const store = mockStore(initialState);

    // Render ResourcePage inside MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <ResourcePage />
        </MemoryRouter>
      </Provider>
    );

    // Wait for resources to load
    const resourceContent = await screen.findByText(
      'How to identify financial scams'
    );

    // Check if the ResourceBox components are rendered
    const resourceBoxes = screen.getAllByTestId('resource-box');
    expect(resourceBoxes.length).toBe(2); // Two resources in the mock data
    expect(resourceContent).toBeInTheDocument();
  });

  it('renders resource categories and content correctly', async () => {
    // Set up mock Redux state
    const initialState = { session: { token: 'mock-token' } };
    const store = mockStore(initialState); 

    // Render ResourcePage inside MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <ResourcePage />
        </MemoryRouter>
      </Provider>
    );

    // Wait for resources to load
    await screen.findByText('How to identify financial scams');

    // Verify the category and content of each resource
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('How to identify financial scams')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Common tech scam tactics')).toBeInTheDocument();
  });
});
