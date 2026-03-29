
export function calculateTimeLeft(expiredAt: string | Date): string {
    const expiredDate = typeof expiredAt === 'string' ? new Date(expiredAt) : expiredAt;
    const diff = convertLocalToUTC(expiredDate).getTime() - convertLocalToUTC(new Date()).getTime();
    if (diff <= 0) {
        return "Expired";
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

export function convertLocalToUTC(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}