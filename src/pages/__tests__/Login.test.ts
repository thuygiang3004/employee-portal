import {describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import axios from 'axios';
import Login from "@/pages/Login.vue";

vi.mock('axios', () => ({
    default: {
        post: vi.fn(),
    },
}));

describe('LoginForm', () => {
    it('renders form fields correctly', () => {
        const wrapper = mount(Login);

        expect(wrapper.find('input[type="email"]#email').exists()).toBe(true);
        expect(wrapper.find('input[type="password"]#password').exists()).toBe(true);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('validates form submission with empty fields', async () => {
        const wrapper = mount(Login);

        await wrapper.find('form').trigger('submit');

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Email is required');
    });

    it('validates form submission with invalid email', async () => {
        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('invalid-email');
        await wrapper.find('#password').setValue('password123');
        await wrapper.find('form').trigger('submit');

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Invalid email format');
    });

    it('validates form submission with valid data', async () => {
        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('#password').setValue('password123');

        await wrapper.find('form').trigger('submit');

        expect(axios.post).toHaveBeenCalledWith('/api/login', {
            email: 'test@example.com',
            password: 'password123',
        });
    });

    it('shows error message when login fails', async () => {
        axios.post.mockRejectedValue({
            response: {data: {message: 'Invalid credentials'}},
        });

        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('wrong@example.com');
        await wrapper.find('#password').setValue('wrongpassword');
        await wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Invalid credentials');
    });

    it('shows generic error message when login request fails unexpectedly', async () => {
        axios.post.mockRejectedValue(new Error('Network Error'));

        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('#password').setValue('password123');
        await wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Login failed. Please try again.');
    });

    it('stores login information in localStorage when login is successful', async () => {
        // Mock successful login response
        const mockResponse = {
            data: {
                name: 'Test User',
                email: 'test@example.com',
                token: 'test-token'
            }
        };
        axios.post.mockResolvedValue(mockResponse);

        // Mock localStorage
        const localStorageMock = {
            store: {} as Record<string, string>,
            setItem: vi.fn((key, value) => {
                localStorageMock.store[key] = value;
            }),
            getItem: vi.fn((key) => localStorageMock.store[key]),
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        const wrapper = mount(Login);

        // Fill in and submit the form
        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('#password').setValue('password123');
        await wrapper.find('form').trigger('submit');

        await flushPromises();

        // Verify localStorage calls
        expect(localStorageMock.setItem).toHaveBeenCalledWith('email', JSON.stringify(mockResponse.data.name));
        expect(localStorageMock.setItem).toHaveBeenCalledWith('token', JSON.stringify(mockResponse.data.email));
        expect(localStorageMock.setItem).toHaveBeenCalledWith('userName', JSON.stringify(mockResponse.data.token));
    });
});
