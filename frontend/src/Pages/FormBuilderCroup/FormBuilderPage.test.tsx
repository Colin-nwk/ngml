import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FormBuilderPage from './FormBuilderPage'

// Mock the Redux hooks and services
vi.mock('@/Redux/Features/FormBuilder/formBuilderService', () => ({
    useCreateFormMutation: () => [vi.fn(), { isLoading: false }],
    useUpdateFormMutation: () => [vi.fn()],
    useGetFormsQuery: () => ({
        data: {
            data: [
                {
                    id: 1,
                    name: 'Test Form',
                    description: 'Test Description',
                    process_flow_id: '1',
                    process_flow_step_id: '1',
                    tag_id: '1',
                    json_form: '[]',
                    status: 'active',
                    created_at: '2024-01-01'
                }
            ]
        }
    }),
    useGetTagsQuery: () => ({
        data: {
            data: [
                { id: 1, name: 'Test Tag' },
                { id: 2, name: 'Another Tag' }
            ]
        }
    })
}))

vi.mock('@/Redux/Features/ProcessFlow/processFlowService', () => ({
    useGetProcessFlowsQuery: () => ({
        data: {
            data: [
                {
                    id: 1,
                    name: 'Test Process Flow',
                    steps: [
                        { id: 1, name: 'Step 1' }
                    ]
                }
            ]
        }
    })
}))

vi.mock('@/Redux/Features/UserSettings/locationService', () => ({
    useGetLocationsQuery: () => ({
        data: {
            data: [
                { id: 1, location: 'Test Location' }
            ]
        }
    })
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe('FormBuilderPage', () => {
    const renderWithProviders = (component: React.ReactNode) => {
        const store = configureStore({
            reducer: {
                // Add your reducers here
            }
        })

        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <DndProvider backend={HTML5Backend}>
                        {component}
                    </DndProvider>
                </BrowserRouter>
            </Provider>
        )
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the form builder page', () => {
        renderWithProviders(<FormBuilderPage />)
        expect(screen.getByText('Form Builder')).toBeInTheDocument()
    })

    it('allows users to add form elements via drag and drop', async () => {
        renderWithProviders(<FormBuilderPage />)
        const textElement = screen.getByText('Text')
        expect(textElement).toBeInTheDocument()

        // Note: Testing drag and drop functionality requires more complex setup
        // Consider using @testing-library/user-event for this
    })

    it('allows users to input form name and description', () => {
        renderWithProviders(<FormBuilderPage />)

        const nameInput = screen.getByPlaceholderText('Form Name')
        const descriptionInput = screen.getByPlaceholderText('Form Description')

        fireEvent.change(nameInput, { target: { value: 'Test Form' } })
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })

        expect(nameInput).toHaveValue('Test Form')
        expect(descriptionInput).toHaveValue('Test Description')
    })

    it('shows process flow fields when "Remove ProcessFlow" is checked', () => {
        renderWithProviders(<FormBuilderPage />)

        const checkbox = screen.getByLabelText('Remove ProcessFlow')
        fireEvent.click(checkbox)

        expect(screen.getByText('Select a processflow')).toBeInTheDocument()
        expect(screen.getByText('Select a processflow step')).toBeInTheDocument()
    })

    it('shows the forms list modal when "All Forms" button is clicked', () => {
        renderWithProviders(<FormBuilderPage />)

        const allFormsButton = screen.getByText('All Forms')
        fireEvent.click(allFormsButton)

        expect(screen.getByText('List of Forms')).toBeInTheDocument()
    })
})