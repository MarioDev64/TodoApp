import { useSettingsStore } from '@/lib/store/settingsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('SettingsStore', () => {
  // Asegurarse de limpiar el AsyncStorage y el estado antes de cada prueba
  beforeEach(async () => {
    await AsyncStorage.clear();
    useSettingsStore.setState({ theme: 'light', notificationsEnabled: true });
  });

  test('setTheme actualiza el tema correctamente', () => {
    useSettingsStore.getState().setTheme('dark');
    expect(useSettingsStore.getState().theme).toBe('dark');
  });

  test('toggleNotifications cambia el estado de las notificaciones', () => {
    const initial = useSettingsStore.getState().notificationsEnabled;
    useSettingsStore.getState().toggleNotifications();
    expect(useSettingsStore.getState().notificationsEnabled).toBe(!initial);
  });

  test('clearAllData resetea a valores por defecto', () => {
    // Cambiamos el estado a valores diferentes
    useSettingsStore.getState().setTheme('dark');
    useSettingsStore.getState().toggleNotifications(); // pasa a false
    expect(useSettingsStore.getState().theme).toBe('dark');
    expect(useSettingsStore.getState().notificationsEnabled).toBe(false);

    // Al llamar a clearAllData se deben volver a los valores por defecto
    useSettingsStore.getState().clearAllData();
    expect(useSettingsStore.getState().theme).toBe('light');
    expect(useSettingsStore.getState().notificationsEnabled).toBe(true);
  });
});
