import moment from 'moment';

export function useDateFormatter() {
    const formatDateISO = (date: string | Date): string => {
        return moment(date).format('YYYY-MM-DD');
    };

    const formatDateShort = (date: string | Date): string => {
        return moment(date).format('MM/DD/YYYY');
    };

    const formatDateLong = (date: string | Date): string => {
        return moment(date).format('DD MMM, YYYY');
    };

    const formatDateFull = (date: string | Date): string => {
        return moment(date).format('dddd, MMMM Do YYYY');
    };

    return {
        formatDateISO,
        formatDateShort,
        formatDateLong,
        formatDateFull
    };
}