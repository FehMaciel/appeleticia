import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerComponent = ({
    showPicker,
    pickerMode,
    date,
    onPickerChange,
    showDatepicker,
    showTimepicker,
    formatDate,
    formatTime,
}) => {
    return (
        <>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onPickerChange}
                />
            )}
        </>
    );
};

export default DateTimePickerComponent;
