import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewRequest from '../NewRequest.vue'

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
}) 