import dayjs from "dayjs";

export const transformEvents = (dataEvents: any) => {
    const transformed: any = [];

    dataEvents.forEach((item: any) => {
        const start = dayjs(item.from);
        const end = dayjs(item.to);
        let currentStart = start.clone();

        while (currentStart.isBefore(end) || currentStart.isSame(end, 'day')) {
            // If currentStart is a weekend, skip to Monday
            if (currentStart.day() === 6) { // Saturday
                currentStart = currentStart.add(2, 'day');
                continue;
            }
            if (currentStart.day() === 0) { // Sunday
                currentStart = currentStart.add(1, 'day');
                continue;
            }

            // Find the next Friday or the end date, whichever is earlier
            let currentEnd = currentStart.clone();
            while (
                currentEnd.day() !== 5 && // Not Friday
                currentEnd.isBefore(end, 'day') &&
                currentEnd.day() !== 6 && // Avoid Saturday
                currentEnd.day() !== 0   // Avoid Sunday
                ) {
                currentEnd = currentEnd.add(1, 'day');
            }

            // Adjust if currentEnd falls on weekend
            if (currentEnd.day() === 6) {
                currentEnd = currentEnd.subtract(1, 'day');
            } else if (currentEnd.day() === 0) {
                currentEnd = currentEnd.subtract(2, 'day');
            }

            transformed.push({
                key: `event-${item.id}-${currentStart.format('YYYYMMDD')}`,
                dates: [[currentStart.toDate(), currentEnd.toDate()]],
                customData: {
                    description: `${item.first_name} ${item.last_name}: ${item.reason}`.substring(0, 40),
                },
            });

            // Move to next Monday after currentEnd
            currentStart = currentEnd.add(1, 'day');
            if (currentStart.day() === 6) currentStart = currentStart.add(2, 'day'); // skip Saturday
            if (currentStart.day() === 0) currentStart = currentStart.add(1, 'day'); // skip Sunday
        }
    });

    return transformed.sort((a: any, b: any) => a.dates.length - b.dates.length );
};

export const transformEventsForScheduleX = (dataEvents: any) => {
    const transformed: any = [];

    dataEvents.forEach((item: any) => {
        const start = dayjs(item.from);
        const end = dayjs(item.to);
        let currentStart = start.clone();

        while (currentStart.isBefore(end) || currentStart.isSame(end, 'day')) {
            // If currentStart is a weekend, skip to Monday
            if (currentStart.day() === 6) { // Saturday
                currentStart = currentStart.add(2, 'day');
                continue;
            }
            if (currentStart.day() === 0) { // Sunday
                currentStart = currentStart.add(1, 'day');
                continue;
            }

            // Find the next Friday or the end date, whichever is earlier
            let currentEnd = currentStart.clone();
            while (
                currentEnd.day() !== 5 && // Not Friday
                currentEnd.isBefore(end, 'day') &&
                currentEnd.day() !== 6 && // Avoid Saturday
                currentEnd.day() !== 0   // Avoid Sunday
                ) {
                currentEnd = currentEnd.add(1, 'day');
            }

            // Adjust if currentEnd falls on weekend
            if (currentEnd.day() === 6) {
                currentEnd = currentEnd.subtract(1, 'day');
            } else if (currentEnd.day() === 0) {
                currentEnd = currentEnd.subtract(2, 'day');
            }

            transformed.push({
                id: `event-${item.id}-${currentStart.format('YYYYMMDD')}`,
                start: currentStart.format('YYYY-MM-DD'),
                end: currentEnd.format('YYYY-MM-DD'),
                title: `${item.first_name} ${item.last_name}: ${item.reason}`.substring(0, 40),
            });

            // Move to next Monday after currentEnd
            currentStart = currentEnd.add(1, 'day');
            if (currentStart.day() === 6) currentStart = currentStart.add(2, 'day'); // skip Saturday
            if (currentStart.day() === 0) currentStart = currentStart.add(1, 'day'); // skip Sunday
        }
    });

    return transformed
};
