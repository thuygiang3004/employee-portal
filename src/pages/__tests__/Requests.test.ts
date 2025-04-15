import {beforeEach, describe, expect, it, vi} from "vitest";
import {flushPromises, mount} from "@vue/test-utils";
import Requests from "@/pages/Requests.vue";
import {nextTick} from "vue";

const mockHttpRequest = vi.hoisted(() => ({
    getRequest: vi.fn(),
    postRequest: vi.fn(),
}))

vi.mock('@/services/httpServices', () => {
    return {
        getRequest: mockHttpRequest.getRequest,
        postRequest: mockHttpRequest.postRequest,
    }
})

describe('Requests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockReceivedRequest = {
        id: 60,
        first_name: "Korey",
        last_name: "Boyle",
        email: "ischiller@example.net",
        from: "2025-03-25",
        to: "2025-04-14",
        reason: "Sick",
        status: "pending_approval",
    };

    const mockMyRequest = {
        id: 58,
        first_name: "Marilie",
        last_name: "Champlin",
        email: "test@example.com",
        from: "2025-04-11",
        to: "2025-04-19",
        reason: "Test",
        status: "pending_approval",
    };

    it('renders initial loading state', () => {
        const wrapper = mount(Requests);
        expect(wrapper.find('.animate-spin').exists()).toBe(true);
    });

    it('fetches and displays requests correctly', async () => {
        mockHttpRequest.getRequest.mockImplementation((url) => {
            if (url === 'requests?toMe=1') {
                return {data: [mockReceivedRequest]};
            }
            return {data: [mockMyRequest]};
        });

        const wrapper = mount(Requests);
        await flushPromises();

        // Check My Requests tab content
        const myRequestTab = wrapper.find('button#my-requests');
        expect(myRequestTab.exists()).toBe(true);
        expect(wrapper.text()).toContain('Marilie Champlin');
        expect(wrapper.text()).toContain('test@example.com');

        // Switch to Received Requests tab
        await wrapper.find('button#received-requests').trigger('click');
        expect(wrapper.text()).toContain('Korey Boyle');
        expect(wrapper.text()).toContain('ischiller@example.net');
    });

    it('handles API error correctly', async () => {
        mockHttpRequest.getRequest.mockRejectedValue(new Error('API Error'));
        const wrapper = mount(Requests);

        await flushPromises();
        await nextTick();

        expect(wrapper.text()).toContain('Failed to load requests. Please try again later.');
    });

    it('shows approve/reject buttons only for pending received requests', async () => {
        mockHttpRequest.getRequest.mockImplementation((url) => {
            if (url === 'requests?toMe=1') {
                return {
                    data: [
                        mockReceivedRequest,
                        {...mockReceivedRequest, id: 61, status: 'approved'},
                    ],
                };
            }
            return {data: [mockMyRequest]};
        });

        const wrapper = mount(Requests);
        await flushPromises();

        // Switch to Received Requests tab
        await wrapper.find('button#received-requests').trigger('click');

        // Should find one set of approve/reject buttons (for pending request)
        const approveButtons = wrapper.findAll('button').filter(btn => btn.text() === 'Approve');
        const rejectButtons = wrapper.findAll('button').filter(btn => btn.text() === 'Reject');
        expect(approveButtons).toHaveLength(1);
        expect(rejectButtons).toHaveLength(1);
    });

    it('handles request approval correctly', async () => {
        mockHttpRequest.getRequest.mockImplementation((url) => {
            if (url === 'requests?toMe=1') {
                return {data: [mockReceivedRequest]};
            }
            return {data: [mockMyRequest]};
        });

        mockHttpRequest.postRequest.mockResolvedValue({status: 201});

        const wrapper = mount(Requests);
        await flushPromises();

        // Switch to Received Requests tab
        await wrapper.find('button#received-requests').trigger('click');

        // Click approve button
        const approveButton = wrapper.findAll('button').filter(btn => btn.text() === 'Approve')[0];
        await approveButton.trigger('click');

        // Verify API calls
        expect(mockHttpRequest.postRequest).toHaveBeenCalledWith(
            `requests/approve/${mockReceivedRequest.id}`,
            {},
        );
        expect(mockHttpRequest.getRequest).toHaveBeenCalledWith('requests?toMe=1');
    });

    it('handles request rejection correctly', async () => {
        mockHttpRequest.getRequest.mockImplementation((url) => {
            if (url === 'requests?toMe=1') {
                return {data: [mockReceivedRequest]};
            }
            return {data: [mockMyRequest]};
        });

        mockHttpRequest.postRequest.mockResolvedValue({status: 201});

        const wrapper = mount(Requests);
        await flushPromises();

        // Switch to Received Requests tab
        await wrapper.find('button#received-requests').trigger('click');

        // Click reject button
        const rejectButton = wrapper.findAll('button').filter(btn => btn.text() === 'Reject')[0];
        await rejectButton.trigger('click');

        // Verify API calls
        expect(mockHttpRequest.postRequest).toHaveBeenCalledWith(
            `requests/reject/${mockReceivedRequest.id}`,
            {},
        );
        expect(mockHttpRequest.getRequest).toHaveBeenCalledWith('requests?toMe=1');
    });

    it('handles approval/rejection errors correctly', async () => {
        mockHttpRequest.getRequest.mockImplementation((url) => {
            if (url === 'requests?toMe=1') {
                return {data: [mockReceivedRequest]};
            }
            return {data: [mockMyRequest]};
        });

        mockHttpRequest.postRequest.mockRejectedValue(new Error('API Error'));

        const wrapper = mount(Requests);
        await flushPromises();

        // Switch to Received Requests tab
        await wrapper.find('button#received-requests').trigger('click');

        // Try to approve
        const approveButton = wrapper.findAll('button').filter(btn => btn.text() === 'Approve')[0];
        await approveButton.trigger('click');

        await flushPromises();
        expect(wrapper.text()).toContain('Failed to approve the request. Please try again later.');
    });
});