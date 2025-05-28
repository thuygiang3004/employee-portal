import {describe, expect, it, vi} from 'vitest'
import {flushPromises, mount} from '@vue/test-utils'
import NewRequest from '../NewRequest.vue'

const mocks = vi.hoisted(() => ({
    postRequest: vi.fn().mockReturnValue({status: 200}),
}))

vi.mock('@/services/httpServices.ts',  async () => ({
    ...(await vi.importActual('@/services/httpServices.ts')),
    getRequest: vi.fn().mockReturnValue({
        data: [
            {id: 1, first_name: 'John', last_name: 'Doe'},
            {id: 2, first_name: 'Jane', last_name: 'Smith'},
        ],
    }),
    postRequest: mocks.postRequest,
}))

describe('NewRequest', () => {
    it('renders form fields correctly', () => {
        const wrapper = mount(NewRequest)

        expect(wrapper.find('input[type="datetime-local"]#from').exists()).toBe(true)
        expect(wrapper.find('input[type="datetime-local"]#to').exists()).toBe(true)
        expect(wrapper.find('textarea#reason').exists()).toBe(true)
        expect(wrapper.find('select#manager').exists()).toBe(true)
    })

    it('validates form submission with valid data', async () => {
        const wrapper = mount(NewRequest)

        await wrapper.find('#from').setValue('2025-05-29T09:00')
        await wrapper.find('#to').setValue('2025-05-29T17:00')
        await wrapper.find('#reason').setValue('Vacation')
        await wrapper.find('#manager').setValue(1)

        await wrapper.find('form').trigger('submit')

        expect(wrapper.find('.error').exists()).toBe(false)
        expect(mocks.postRequest).toHaveBeenCalledWith(
            'requests/create',
            {
                from: '2025-05-29T09:00',
                to: '2025-05-29T17:00',
                reason: 'Vacation',
                managerId: 1,
            }
        )
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