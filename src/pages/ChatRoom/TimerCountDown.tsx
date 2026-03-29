import { useEffect, useState } from "react";
import { calculateTimeLeft } from "~/utils/date_time._utils";

export default function TimerCountDown({ expiredAt }: { expiredAt: string | null }) {
    if (expiredAt == null) return <></>;
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiredAt));
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(expiredAt));
        }, 1000);
        return () => clearInterval(timer);
    }, [expiredAt]);
    return (
        <span className="text-xs text-text-muted/50">
            {timeLeft}
        </span>
    )
}