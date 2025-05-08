export const RESERVATION_STATUS = {
    REQUESTED: 'Requested',
    APPROVED: 'Approved',
    CANCELLED: 'Cancelled',
    COMPLETED: 'Completed',
} as const;

export const RESERVATION_STATUS_OPTIONS = [
    { value: '', label: 'All Statuses' },
    { value: RESERVATION_STATUS.REQUESTED, label: 'Requested' },
    { value: RESERVATION_STATUS.APPROVED, label: 'Approved' },
    { value: RESERVATION_STATUS.CANCELLED, label: 'Cancelled' },
    { value: RESERVATION_STATUS.COMPLETED, label: 'Completed' },
];