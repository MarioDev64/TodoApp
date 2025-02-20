# 📝 TodoApp - Task Management Application

**TodoApp** is a mobile application developed with **React Native**, **Expo Router**, and **TypeScript** that allows users to manage their tasks efficiently. With features to create, edit, reorder, and delete tasks, as well as schedule reminder notifications, TodoApp provides a complete personal management experience.

## 🚀 Key Features:
- **Home Screen**:  
  Displays a list of tasks, allowing them to be reordered via drag-and-drop using `react-native-draglist`.

- **Task Creation & Editing**:  
  Enables users to create new tasks and edit existing ones through forms validated with `react-hook-form` and `zod`.

- **Task Management**:  
  Users can mark tasks as completed, delete them, and reorder the list. The application uses **Zustand** for state management and persists data using **AsyncStorage**.

- **Notifications**:  
  Schedules notifications with `expo-notifications` to remind users of pending tasks at specified times.

- **Settings & Configuration**:  
  Includes a settings screen where users can enable or disable notifications and clear all stored data.

- **Dark/Light Theme**:  
  Supports switching between light and dark modes, integrated with **Nativewind** and **TailwindCSS** for consistent styling.

## 📱 Navigation:
- **Expo Router**:  
  Navigation is managed using **Expo Router**, facilitating file-based routing and screen organization (including the home screen, settings, and modals for creating/editing tasks).

- **Stack Navigation**:  
  Used in the layout (`_layout.tsx`) to handle smooth transitions between various screens and modals.

## 🛠️ Technologies Used:
- **React Native** and **Expo**: Framework and tools for mobile app development.
- **Expo Router**: File-based routing and navigation management.
- **TypeScript**: Provides strong typing for robust development.
- **Zustand**: Global state management with persistence in AsyncStorage.
- **Nativewind & TailwindCSS**: Styling and responsive design.
- **React Hook Form** and **Zod**: Form handling and validation.
- **Expo Notifications**: Scheduling notifications for task reminders.
- **React Native Gesture Handler** and **react-native-draglist**: Touch interactions and list reordering.

## 📂 Folder Structure:
- **app/**:  
  Contains main screens and route configurations, including:
  - `index.tsx`: The home screen displaying the task list.
  - `settings.tsx`: The settings screen.
  - `modals/`: Directory containing modal screens for creating and editing tasks.

- **components/**:
  Specific UI components such as:
    - `TaskCard.tsx`: Card component displaying task details.
    - `Toast.tsx` and `DeleteConfirmation.tsx`: Components for notifications and deletion confirmations.
  - **organisms/**:  
    Composite components, such as:
    - `TaskList.tsx`: The task list with drag-and-drop functionality.
    - `TaskForm.tsx`: Form for creating and editing tasks.
  - **nativewindui/**:  
    Custom UI components (e.g., `Text.tsx` and `ThemeToggle.tsx`).
  
- **lib/**:
  - **store/**:  
    Global state management using **Zustand** (for tasks, settings, and UI state).
  - **utils/**:  
    Helper functions for animations, notification handling, and theme utilities.
  - **validations/**:  
    Form validation schemas using **Zod**.

- **theme/**:  
  Theme configuration, color palettes, and hooks for managing color schemes.

- **__test__/**:  
  Unit tests (e.g., tests for `taskStore` using Jest).

## ⚙️ Setup & Installation:
1. **Clone the repository:**
```bash
   git clone https://github.com/YourUsername/TodoApp.git
```
2. **Install dependencies:**
```bash
  npm install
  # or
  yarn install
```

3. **Start the application in development mode:**
```bash
  npx expo start
  # or
  npm run start
  # or
  yarn start
```

## 🧪 Testing:
**To run unit tests:**
```bash
  npm test
  #or
  yarn test
```
_Ensure you have Jest and the necessary dependencies configured._

## 📝 Commit Guidelines & Conventional Commits

This project adheres to the [Conventional Commits](https://www.conventionalcommits.org/) standard to maintain a clear and consistent commit history. To create commits following this standard, run:

```bash
  npm run commit
  #or
  yarn commit
```

## 📄 License:
This project is distributed under the **UNLICENSED** license.

## 🔧 Contributions:
Contributions are welcome. If you wish to suggest improvements or report issues, please open an issue or submit a pull request.
