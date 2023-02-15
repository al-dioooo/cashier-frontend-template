import moment from "moment"

export const checkDue = (date, due = moment().subtract(1, 'months').endOf('month')) => {
    return moment(date).isBefore(due)
}