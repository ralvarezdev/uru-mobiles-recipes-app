import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { GestureResponderEvent, Modal, Pressable, StyleProp, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { styles } from "./ActionMenu.style";

interface ActionMenuProps {
  show: boolean;
  actions: { text: string; action: () => void }[];
  optionIconColor?: string;
  iconStyle: StyleProp<TextStyle>;
}

export function ActionMenu({ show, actions, optionIconColor, iconStyle }: ActionMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Importante: medir sobre un View real, no directamente el Pressable
  const anchorRef = useRef<View>(null);

  const openMenuAtAnchor = () => {
    anchorRef.current?.measureInWindow((x, y, w, h) => {
      // Desplazamiento para que quede "debajo"
      const top = y + h + 6;
      // Centrar aprox. respecto al botón (ajusta según ancho del menú)
      const left = Math.max(8, x + w / 2 - 120); // 120 ≈ la mitad del ancho del menú
      setPos({ top, left });
      setMenuVisible(true);
    });
  };

  const onMenuPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    openMenuAtAnchor();
  };

  const handleOnClose = () => setMenuVisible(false);

  return (
    show && (
      <>
        {/* View contenedor medible */}
        <View ref={anchorRef} collapsable={false}>
          <Pressable
            hitSlop={10}
            onPress={onMenuPress}
            accessibilityRole="button"
            accessibilityLabel="Más opciones"
            accessibilityHint="Abre el menú contextual"
            style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.7 }]}>
            <MaterialIcons style={iconStyle} name="more-vert" size={22} color={optionIconColor || "#ECF3EE"} />
          </Pressable>
        </View>

        <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={handleOnClose}>
          {/* Usa un overlay que no consuma el mismo toque que abre el modal */}
          <TouchableOpacity activeOpacity={1} style={styles.overlay} onPress={handleOnClose}>
            <View
              style={[
                styles.menu,
                {
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                },
              ]}>
              {actions.map((a) => (
                <TouchableOpacity
                  key={a.text}
                  onPress={() => {
                    a.action();
                    handleOnClose();
                  }}
                  style={styles.menuItem}>
                  <Text>{a.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    )
  );
}

// import { MaterialIcons } from "@expo/vector-icons";
// import React from "react";
// import { GestureResponderEvent, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
// import { styles } from "./ActionMenu.style";

// interface ActionMenuProps {
//   show: boolean;
//   actions: Action[];
//   // onEdit: () => void;
//   // onDelete: () => void;
//   // onClose: () => void;
// }

// interface Action {
//   text: string;
//   action: () => void;
// }

// export function ActionMenu({ show, actions }: ActionMenuProps) {
//   const [menuVisible, setMenuVisible] = React.useState(false);
//   // if (!show) return null;
//   const onMenuPress = (event: GestureResponderEvent) => {
//     event.stopPropagation();
//     setMenuVisible(true);
//   };
//   const handleOnClose = () => {
//     setMenuVisible(false);
//   };

//   return (
//     show && (
//       <>
//         <Pressable
//           hitSlop={10}
//           onPress={onMenuPress}
//           accessibilityRole="button"
//           accessibilityLabel={`Más opciones`}
//           // accessibilityLabel={`Más opciones para ${group.title}`}
//           accessibilityHint="Abre el menú contextual"
//           style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.7 }]}>
//           <MaterialIcons name="more-vert" size={22} color="#ECF3EE" />
//         </Pressable>
//         <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={handleOnClose}>
//           <TouchableOpacity style={styles.overlay} onPress={handleOnClose}>
//             <View style={styles.menu}>
//               {actions.map((a) => (
//                 <TouchableOpacity key={a.text} onPress={a.action} style={styles.menuItem}>
//                   <Text>{a.text}</Text>
//                 </TouchableOpacity>
//               ))}
//               {/* <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
//             <Text>Add</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onEdit} style={styles.menuItem}>
//             <Text>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onDelete} style={styles.menuItem}>
//             <Text>Delete</Text>
//           </TouchableOpacity> */}
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </>
//     )
//   );
// }
