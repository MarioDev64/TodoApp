import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { X } from 'lucide-react-native';
import { useAppTheme } from '@/lib/utils/theme';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  const { colors } = useAppTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      default: return colors.primary;
    }
  };

  return (
    <Animated.View
      className="absolute bottom-4 mx-4 p-4 rounded-lg flex-row items-center"
      style={{ 
        opacity: fadeAnim,
        backgroundColor: getBackgroundColor()  
    }}
    >
      <Text className="text-white flex-1">{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <X color="white" size={20} />
      </TouchableOpacity>
    </Animated.View>
  );
}