# Mobile App CLAUDE.md Template

For React Native and mobile projects.

---

```markdown
# Mobile App Name

[Brief description]

## Tech Stack

- React Native [version]
- Framework: [Expo / bare React Native]
- Navigation: [React Navigation / Expo Router]
- State: [Zustand / Redux / Jotai]
- Styling: [StyleSheet / NativeWind / Tamagui]
- Backend: [Supabase / Firebase / Custom API]

## Project Structure

```
mobile-app/
├── app/                    # Expo Router screens (if using)
│   ├── (tabs)/            # Tab navigation group
│   ├── (auth)/            # Auth screens group
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Home screen
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── [feature]/     # Feature components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities, API clients
│   ├── stores/            # State management
│   └── types/             # TypeScript types
├── assets/
│   ├── images/
│   └── fonts/
├── app.json               # Expo config
└── eas.json               # EAS Build config
```

## Conventions

### Components
- Functional components only
- Use memo() for list items
- Keep components small and focused
- Colocate styles with components

### Styling
```typescript
// Using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

// Or NativeWind (Tailwind)
<View className="flex-1 p-4">
```

### Navigation
```typescript
// Type-safe navigation
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
};

// Usage
navigation.navigate('Profile', { userId: '123' });
```

### Naming
- Screens: PascalCase with Screen suffix (HomeScreen.tsx)
- Components: PascalCase (UserCard.tsx)
- Hooks: use prefix (useAuth.ts)
- Stores: lowercase with Store suffix (authStore.ts)

## Commands

### Development
```bash
# Start Expo dev server
npx expo start

# iOS simulator
npx expo start --ios

# Android emulator
npx expo start --android

# Clear cache
npx expo start --clear
```

### Building
```bash
# Development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Production build
eas build --profile production --platform all
```

### Testing
```bash
npm test
npm run test:watch
```

### Other
```bash
# Install pod dependencies (iOS)
cd ios && pod install && cd ..

# Prebuild (generate native code)
npx expo prebuild

# Update Expo SDK
npx expo install expo@latest
```

## Platform Patterns

### Platform-Specific Code
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
    },
    android: {
      elevation: 2,
    },
  }),
});
```

### Safe Areas
```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView edges={['top', 'bottom']}>
  {/* content */}
</SafeAreaView>
```

### Keyboard Handling
```typescript
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  {/* form content */}
</KeyboardAvoidingView>
```

## Don'ts

- Don't use inline styles (performance)
- Don't forget to test on both platforms
- Don't use web-only packages
- Don't ignore keyboard behavior
- Don't hardcode dimensions (use flex, %)
- Don't forget to handle safe areas

## Performance Tips

- Use FlatList for long lists (not ScrollView + map)
- Use React.memo for list items
- Avoid anonymous functions in render
- Use useCallback for event handlers
- Profile with Flipper/React DevTools

## Environment Variables

```
# .env
API_URL=https://api.example.com
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

Access via:
```typescript
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Testing Devices

| Platform | Devices |
|----------|---------|
| iOS | iPhone 14, iPhone SE (small screen) |
| Android | Pixel 7, Samsung S21 |

## Notes

[Project-specific notes, current work, known issues]
```

---

## Expo vs Bare Workflow

### If using Expo (Managed):
- Most native features via expo-* packages
- Build with EAS Build
- OTA updates available

### If using Bare Workflow:
Add:
```markdown
## Native Code
- ios/ - Xcode project
- android/ - Android Studio project
- Run `pod install` after changing native deps
```
