export const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

 export const quotes = [
    "You’ve got this.","Start small. Finish big.","Progress, not perfection.",
    "One task at a time.","Done is better than perfect.","Keep going. You’re closer than you think.",
    "Stay focused and never give up.","Believe in yourself.","You are capable of amazing things.",
    "A little progress each day adds up.", "Show up for yourself.","Make it happen.",
    "Consistency beats intensity.","Dream it. Do it.","Your future self will thank you.",
    "Discipline over motivation.","Today is yours to conquer.","One step closer.",
    "You’re doing better than you think.","Don’t stop until you’re proud.","Every step counts.",
    "Make today count.","Stay focused. Stay sharp.",     
];