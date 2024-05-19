import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import styles from "./Style";
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskModal = ({
  modalVisible,
  task,
  setTask,
  handleAddTask,
  handleCancel,
  validationError,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const initialDate = task.deadline ? new Date(task.deadline) : new Date();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setTask({ ...task, deadline: formattedDate });
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={task.description}
          onChangeText={(text) => setTask({ ...task, description: text })}
        />
        <Text style={styles.inputLabel}>Deadline:</Text>
        <Button
          title={task.deadline || "Select Date"}
          onPress={() => setShowDatePicker(true)}
          color="#007BFF"
        />
        {showDatePicker && (
          <DateTimePicker
            value={initialDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {validationError && (
          <Text style={styles.errorText}>
            Please fill in all fields correctly.
          </Text>
        )}
        <Button
          title={task.id ? "Update" : "Add"}
          onPress={handleAddTask}
          color="#007BFF"
        />
        <Button title="Cancel" onPress={handleCancel} color="#FF3B30" />
      </View>
    </Modal>
  );
};

export default TaskModal;
