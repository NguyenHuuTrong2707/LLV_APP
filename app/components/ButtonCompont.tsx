import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { styles } from '../components/stylesComponent/ButtonStyles'
import { LinearGradient } from 'expo-linear-gradient';
interface ButtonProps {
    title?: string;
    onPress : () => void;
    buttonStyle?: StyleProp<ViewStyle>;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title ,buttonStyle, onPress}) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]}
         onPress={onPress}
        >
            <LinearGradient
                colors={['#fcdd10', '#f58803']}
                style={styles.gradient}>

                <Text style={styles.content}>
                    {title}
                </Text>

            </LinearGradient>
        </TouchableOpacity>




    );
};

export default ButtonComponent;
