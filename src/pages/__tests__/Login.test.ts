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

    it.skip('shows error message when login fails', async () => {
        axios.post.mockReturnValue({
            data: {message: 'Invalid credentials'},
        });

        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('wrong@example.com');
        await wrapper.find('#password').setValue('wrongpassword');
        await wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Invalid credentials');
    });

    it.skip('shows generic error message when login request fails unexpectedly', async () => {
        axios.post.mockReturnValue(new Error('Network Error'));

        const wrapper = mount(Login);

        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('#password').setValue('password123');
        await wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toContain('Login failed. Please try again.');
    });
});
