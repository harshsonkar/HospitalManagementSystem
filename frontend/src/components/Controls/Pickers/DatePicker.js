import React from 'react'
import DateFnsUtils from '@date-io/date-fns/';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'; 
function convertToDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
}
const DatePickerField = (props) => {
    const { field, form, ...other}=props;
    const currentError = form.errors[field.name];
    // console.log(field);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                clearable
                // disablePast
                name={field.name}
                value={field.value}
                format="dd/MM/yyyy"
                helperText={currentError}
                error={Boolean(currentError)}
                onError={error => {
                    // console.log(error);

                    // handle as a side effect
                    if(error !== currentError) {
                        // console.log(error);
                        form.setFieldError(field.name, error);
                    }
                }}
                // if you are using custom validation schema you probably want to pass `true` as third argument
                onChange={date => form.setFieldValue(field.name, date)}
                {...other} 
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePickerField;
