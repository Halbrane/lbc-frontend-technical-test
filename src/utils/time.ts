export const timestampToString = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const formattedDate = `${date?.getDate().toString().padStart(2, '0')}/${(date?.getMonth() + 1).toString().padStart(2, '0')}/${date?.getFullYear().toString()} ${date?.getHours().toString().padStart(2, '0')}:${date?.getMinutes().toString().padStart(2, '0')}`;
    return (formattedDate);
}
