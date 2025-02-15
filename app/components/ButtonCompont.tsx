import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { styles } from '../components/stylesComponent/ButtonStyles'
import { LinearGradient } from 'expo-linear-gradient';
interface ButtonProps {
    title?: string;
    onPress : () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    disabled? : boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({ title ,buttonStyle,disabled = false, onPress}) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
         disabled = {disabled}
         onPress={!disabled ? onPress : undefined}
        >
            <LinearGradient
                colors={disabled ? ['#BEBEBE', '#8A8A8A'] : ['#fcdd10', '#f58803']}
                style={styles.gradient}>

                <Text style={[styles.content, disabled && styles.disabledText]}>
                    {title}
                </Text>

            </LinearGradient>
        </TouchableOpacity>




    );
};

export default ButtonComponent;
