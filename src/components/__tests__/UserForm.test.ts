import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserForm from '../UserForm.vue'

describe('UserForm', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(UserForm)
  })

  it('renders properly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('validates form submission with valid data', async () => {
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[type="number"]').setValue(25)
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('shows error with invalid data', async () => {
    await wrapper.find('input[type="text"]').setValue('J') // too short
    await wrapper.find('input[type="email"]').setValue('invalid-email')
    await wrapper.find('input[type="number"]').setValue(-1)
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('.error').exists()).toBe(true)
  })
}) 