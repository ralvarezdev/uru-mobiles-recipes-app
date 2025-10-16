import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ActionMenu.style";

interface ActionMenuProps {
  show: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function ActionMenu({ show, onEdit, onDelete, onClose }: ActionMenuProps) {
  if (!show) return null;
  
  return (
    <Modal transparent animationType="fade" visible={show} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.menuItem}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
