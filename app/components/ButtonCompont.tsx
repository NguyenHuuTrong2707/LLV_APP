import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from '../components/stylesComponent/ButtonStyles'
import { LinearGradient } from 'expo-linear-gradient';
interface ButtonProps {
    title?: string;
    onPress : () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title , onPress}) => {
    return (
        <TouchableOpacity style={styles.button}
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
