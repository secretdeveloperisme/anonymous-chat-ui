export function maskGroupCode(code: string): string {
    return code.slice(0, 4) + "..." + code.slice(-4);
}

export function showTimeLeft(expiredAt: string | Date): string {
    const expiredDate = typeof expiredAt === 'string' ? new Date(expiredAt) : expiredAt;
    const diff = expiredDate.getTime() - new Date().getTime();
    if (diff <= 0) {
        return "Expired";
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}