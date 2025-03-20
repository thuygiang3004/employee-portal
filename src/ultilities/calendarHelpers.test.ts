import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import {transformEvents} from "@/ultilities/calendarHelpers.ts";

describe('transformEvents', () => {
    it('should split date ranges correctly skipping weekends', () => {
        const dataEvents = [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                reason: 'Vacation',
                from: '2025-03-19', // Wednesday
                to: '2025-03-29',   // Saturday
            }
        ];

        const result = transformEvents(dataEvents);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2); // Should split into two ranges

        expect(result[0].dates[0][0]).toEqual(dayjs('2025-03-19').toDate());
        expect(result[0].dates[0][1]).toEqual(dayjs('2025-03-21').toDate()); // Until Friday

        expect(result[1].dates[0][0]).toEqual(dayjs('2025-03-24').toDate()); // Next Monday
        expect(result[1].dates[0][1]).toEqual(dayjs('2025-03-28').toDate()); // Friday (avoid Saturday)
    });

    it('should handle single day event on weekday', () => {
        const dataEvents = [
            {
                id: 2,
                first_name: 'Jane',
                last_name: 'Smith',
                reason: 'Sick',
                from: '2025-03-19',
                to: '2025-03-19',
            }
        ];

        const result = transformEvents(dataEvents);
        expect(result.length).toBe(1);
        expect(result[0].dates[0][0]).toEqual(dayjs('2025-03-19').toDate());
        expect(result[0].dates[0][1]).toEqual(dayjs('2025-03-19').toDate());
    });

    it('should skip weekends entirely', () => {
        const dataEvents = [
            {
                id: 3,
                first_name: 'Weekend',
                last_name: 'Skip',
                reason: 'Holiday',
                from: '2025-03-22', // Saturday
                to: '2025-03-23',   // Sunday
            }
        ];

        const result = transformEvents(dataEvents);
        expect(result.length).toBe(0); // Should skip since it's only weekend
    });
});
