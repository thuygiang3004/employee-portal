import {describe, expect, it, vi} from 'vitest'
import {flushPromises, mount} from '@vue/test-utils'
import NewRequest from '../NewRequest.vue'

vi.mock('axios', () => ({
    default: {
        get: vi.fn().mockReturnValue({
            data: [
                {id: 1, first_name: 'John', last_name: 'Doe'},
                {id: 2, first_name: 'Jane', last_name: 'Smith',},
            ],
        }),
    },
}))

describe('NewRequest', () => {
    it('renders form fields correctly', () => {
        const wrapper = mount(NewRequest)

        expect(wrapper.find('input[type="date"]#from').exists()).toBe(true)
        expect(wrapper.find('input[type="date"]#to').exists()).toBe(true)
        expect(wrapper.find('textarea#reason').exists()).toBe(true)
        expect(wrapper.find('select#manager').exists()).toBe(true)
    })

    it('validates form submission with valid data', async () => {
        const wrapper = mount(NewRequest)

        await wrapper.find('#from').setValue('2024-01-24')
        await wrapper.find('#to').setValue('2024-01-25')
        await wrapper.find('#reason').setValue('Vacation')
        await wrapper.find('#manager').setValue('john')

        await wrapper.find('form').trigger('submit')

        // expect(wrapper.find('.error').exists()).toBe(false)
    })
    it('fetches managers on mount', async () => {
        localStorage.setItem('token', 'my-token')
        const wrapper = mount(NewRequest)
        await flushPromises()
        const options = wrapper.findAll('select#manager option')
        expect(options.length).toBe(3)
        expect(options[1].text()).toBe('John Doe')
        expect(options[2].text()).toBe('Jane Smith')
    })
}) 