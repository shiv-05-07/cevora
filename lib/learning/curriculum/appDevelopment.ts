import { SubjectCurriculum } from './types';

export const appDevelopmentCurriculum: SubjectCurriculum = {
  key: 'app-development',
  label: 'App Development',
  roadmapTitle: 'Mobile App Development Track',
  roadmapDescription: 'Master cross-platform mobile application engineering using React Native, Flutter, native mobile APIs, and local data persistence.',
  roadmapSteps: [
    { id: 'app-1', topicKey: 'mobile-foundations', title: 'Mobile Development Foundations', description: 'Mobile OS architecture, component layout, and screen lifecycle.', order: 1, estimatedMinutes: 45 },
    { id: 'app-2', topicKey: 'ui-navigation', title: 'UI & Navigation', description: 'Screen transitions, stack navigators, tab bars, and responsive mobile layouts.', order: 2, estimatedMinutes: 45 },
    { id: 'app-3', topicKey: 'state-management', title: 'State Management', description: 'Managing application state across nested mobile screen hierarchies.', order: 3, estimatedMinutes: 45 },
    { id: 'app-4', topicKey: 'api-integration', title: 'API Integration', description: 'Connecting mobile apps to REST/GraphQL APIs with offline fallback handling.', order: 4, estimatedMinutes: 45 },
    { id: 'app-5', topicKey: 'local-storage', title: 'Local Storage', description: 'Persisting offline data with SQLite, MMKV, and Encrypted Storage.', order: 5, estimatedMinutes: 60 },
    { id: 'app-6', topicKey: 'authentication', title: 'Authentication', description: 'Biometric auth (FaceID/Fingerprint), OAuth, and secure token storage.', order: 6, estimatedMinutes: 60 },
    { id: 'app-7', topicKey: 'notifications', title: 'Notifications & Push Services', description: 'FCM push notifications, background tasks, and local device triggers.', order: 7, estimatedMinutes: 60 },
    { id: 'app-8', topicKey: 'mobile-project', title: 'App Store & Play Store Deployment', description: 'App signing, release builds, OTA updates, and store publishing.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building mobile architecture and native device interaction skills for production apps.",
    nextStep: "Complete today's app development mission to master mobile screen navigation and native storage."
  },
  diagnosticQuestions: [
    {
      id: 'app_dq1',
      subjectKey: 'app-development',
      conceptKey: 'mobile-foundations',
      concept: 'Mobile Architecture',
      difficulty: 'BEGINNER',
      question: 'What is the main advantage of cross-platform mobile frameworks like React Native or Flutter?',
      options: [
        { id: 'A', text: 'Write single codebase for both iOS and Android platforms' },
        { id: 'B', text: 'Eliminate the need for mobile device testing' },
        { id: 'C', text: 'Automatically host databases on devices' },
        { id: 'D', text: 'Bypass App Store review guidelines' }
      ],
      correctAnswer: 'A',
      explanation: 'Cross-platform frameworks compile to native iOS and Android apps from a unified codebase.'
    },
    {
      id: 'app_dq2',
      subjectKey: 'app-development',
      conceptKey: 'ui-navigation',
      concept: 'Mobile Navigation',
      difficulty: 'BEGINNER',
      question: 'Which navigation pattern is standard for managing hierarchical screen stacks in mobile apps?',
      options: [
        { id: 'A', text: 'Stack Navigator' },
        { id: 'B', text: 'URL Hash Router' },
        { id: 'C', text: 'Grid Layout Manager' },
        { id: 'D', text: 'Direct DOM manipulation' }
      ],
      correctAnswer: 'A',
      explanation: 'Stack Navigators push and pop screens on top of a stack during user navigation.'
    },
    {
      id: 'app_dq3',
      subjectKey: 'app-development',
      conceptKey: 'state-management',
      concept: 'Mobile State',
      difficulty: 'INTERMEDIATE',
      question: 'Why is offline state synchronization critical for mobile applications?',
      options: [
        { id: 'A', text: 'Mobile devices frequently experience intermittent or lost network connectivity' },
        { id: 'B', text: 'Mobile operating systems prohibit network connections' },
        { id: 'C', text: 'It reduces battery voltage requirements' },
        { id: 'D', text: 'It replaces local UI rendering' }
      ],
      correctAnswer: 'A',
      explanation: 'Mobile networks fluctuate constantly; local offline storage ensures apps remain usable without active network.'
    },
    {
      id: 'app_dq4',
      subjectKey: 'app-development',
      conceptKey: 'api-integration',
      concept: 'Mobile Networking',
      difficulty: 'INTERMEDIATE',
      question: 'How should mobile apps handle slow API requests to preserve good user experience?',
      options: [
        { id: 'A', text: 'Display skeleton loaders/spinners and prevent screen freezes' },
        { id: 'B', text: 'Force immediate app termination' },
        { id: 'C', text: 'Block the main UI rendering thread completely' },
        { id: 'D', text: 'Delete user app data' }
      ],
      correctAnswer: 'A',
      explanation: 'Asynchronous network calls with loading indicators prevent UI thread blocking.'
    },
    {
      id: 'app_dq5',
      subjectKey: 'app-development',
      conceptKey: 'local-storage',
      concept: 'Mobile Storage',
      difficulty: 'INTERMEDIATE',
      question: 'Which storage mechanism is recommended for saving sensitive access tokens on mobile devices?',
      options: [
        { id: 'A', text: 'Keychain (iOS) / Keystore (Android)' },
        { id: 'B', text: 'Plain unencrypted text files' },
        { id: 'C', text: 'Public SD card storage' },
        { id: 'D', text: 'Global static JS variables' }
      ],
      correctAnswer: 'A',
      explanation: 'iOS Keychain and Android Keystore store encrypted keys in hardware-backed secure enclaves.'
    },
    {
      id: 'app_dq6',
      subjectKey: 'app-development',
      conceptKey: 'authentication',
      concept: 'Biometric Auth',
      difficulty: 'INTERMEDIATE',
      question: 'What technology powers native FaceID and Fingerprint authentication on mobile devices?',
      options: [
        { id: 'A', text: 'Local Biometric Hardware Enclave APIs' },
        { id: 'B', text: 'Server-side password hashing' },
        { id: 'C', text: 'CSS Animations' },
        { id: 'D', text: 'WebSocket streams' }
      ],
      correctAnswer: 'A',
      explanation: 'Biometric frameworks delegate authentication directly to device hardware security enclaves.'
    },
    {
      id: 'app_dq7',
      subjectKey: 'app-development',
      conceptKey: 'notifications',
      concept: 'Push Notifications',
      difficulty: 'ADVANCED',
      question: 'Which service routes push notification payloads to iOS and Android devices efficiently?',
      options: [
        { id: 'A', text: 'APNs (Apple) & FCM (Firebase Cloud Messaging)' },
        { id: 'B', text: 'HTTP GET Polling' },
        { id: 'C', text: 'Localhost Sockets' },
        { id: 'D', text: 'DNS Records' }
      ],
      correctAnswer: 'A',
      explanation: 'FCM and APNs handle background socket connections to deliver notifications to mobile devices.'
    },
    {
      id: 'app_dq8',
      subjectKey: 'app-development',
      conceptKey: 'mobile-project',
      concept: 'App Deployment',
      difficulty: 'ADVANCED',
      question: 'What is Over-The-Air (OTA) updating in cross-platform mobile frameworks?',
      options: [
        { id: 'A', text: 'Pushing JavaScript bundle updates directly to user devices without App Store re-submission' },
        { id: 'B', text: 'Charging mobile battery via wireless signals' },
        { id: 'C', text: 'Replacing native C++ code dynamically' },
        { id: 'D', text: 'Updating phone firmware over 5G' }
      ],
      correctAnswer: 'A',
      explanation: 'OTA updates allow updating JS/Dart bundle code instantly without waiting for store approval.'
    }
  ],
  missions: [
    {
      id: 'app-m1',
      topicKey: 'mobile-foundations',
      title: 'Mobile Architecture Fundamentals',
      description: 'Understand mobile component trees, native bridges, and screen viewports.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Cross-Platform Mobile Architecture',
        content: 'Mobile components compile or bridge to native UI widgets (UIView on iOS, android.view.View on Android).',
        interactiveExample: {
          language: 'typescript',
          code: 'import { View, Text } from "react-native";\n<View><Text>Mobile UI</Text></View>',
          explanation: 'Native components wrap OS-level layout views.'
        }
      },
      practice: {
        question: 'What is the primary goal of mobile cross-platform frameworks?',
        options: [
          { id: 'A', text: 'Sharing UI logic across iOS and Android from one codebase' },
          { id: 'B', text: 'Eliminating mobile testing' },
          { id: 'C', text: 'Building desktop browsers' },
          { id: 'D', text: 'Managing cloud servers' }
        ],
        correctAnswerId: 'A',
        explanation: 'Cross-platform tools share single application logic across mobile platforms.'
      },
      review: {
        title: 'Mobile Architecture Review',
        pitfalls: ['Hardcoding static pixel heights for viewports with variable notch cutouts'],
        edgeCases: ['Screen rotation handling', 'Small low-density display resolutions'],
        keyTakeaway: 'Use responsive layout flex properties and safe area insets.'
      },
      interview: {
        title: 'Technical Viva: Mobile Threading',
        question: 'Why must UI updates strictly run on the main UI thread in mobile OS architectures?',
        hint: 'Discuss thread safety of native graphics rendering contexts.',
        keyPoints: ['Native view hierarchy operations are not thread-safe', 'Background threads must dispatch UI mutations to the main loop']
      }
    },
    {
      id: 'app-m2',
      topicKey: 'ui-navigation',
      title: 'Building Responsive Mobile Interfaces',
      description: 'Master stack navigation, drawer views, and screen transitions.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Mobile Navigation Patterns',
        content: 'Mobile applications organize screens into navigation stacks. New screens push onto the stack; back actions pop them.',
        interactiveExample: {
          language: 'typescript',
          code: 'navigation.navigate("Details", { id: 101 });',
          explanation: 'Navigating passes parameters down the screen stack.'
        }
      },
      practice: {
        question: 'Which navigation pattern manages screen history stacks?',
        options: [
          { id: 'A', text: 'Stack Navigator' },
          { id: 'B', text: 'Grid Manager' },
          { id: 'C', text: 'Tab Bar' },
          { id: 'D', text: 'Modal View' }
        ],
        correctAnswerId: 'A',
        explanation: 'Stack Navigators manage push/pop screen history.'
      },
      review: {
        title: 'Mobile Navigation Review',
        pitfalls: ['Pushing duplicate instances of the same screen onto the stack repeatedly'],
        edgeCases: ['Deep linking to nested screens from external URLs'],
        keyTakeaway: 'Keep stack depth shallow and handle hardware back buttons on Android.'
      },
      interview: {
        title: 'Technical Viva: Deep Linking',
        question: 'What is deep linking in mobile apps?',
        hint: 'Opening a specific app screen directly via custom URI schemes or HTTPS links.',
        keyPoints: ['Custom URI schemes (app://path)', 'Universal Links / App Links', 'Bypasses home screen to open specific screen']
      }
    },
    {
      id: 'app-m3',
      topicKey: 'state-management',
      title: 'Managing Application State in Mobile',
      description: 'Master local state persistence, global stores, and screen hydration.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Mobile State Management',
        content: 'Mobile app state must handle unmounting when screens leave the view hierarchy.',
        interactiveExample: {
          language: 'typescript',
          code: 'const useStore = create((set) => ({ user: null, setUser: (user) => set({ user }) }));',
          explanation: 'Global state stores retain data across screen transitions.'
        }
      },
      practice: {
        question: 'Why is global state management useful in multi-screen mobile apps?',
        options: [
          { id: 'A', text: 'Prevents prop drilling through deeply nested navigation screens' },
          { id: 'B', text: 'Increases battery life' },
          { id: 'C', text: 'Deletes app caches' },
          { id: 'D', text: 'Bypasses app stores' }
        ],
        correctAnswerId: 'A',
        explanation: 'Global stores allow screens anywhere in the navigation tree to access shared state.'
      },
      review: {
        title: 'Mobile State Review',
        pitfalls: ['Storing un-memoized heavy objects causing unnecessary re-renders'],
        edgeCases: ['Restoring app state after OS memory pressure force-kills background app process'],
        keyTakeaway: 'Combine light global state with durable local storage persistence.'
      },
      interview: {
        title: 'Technical Viva: Mobile State Hydration',
        question: 'How do mobile apps achieve fast cold-start load times with stored state?',
        hint: 'Hydrating state asynchronously from local disk cache on launch.',
        keyPoints: ['Read cached state asynchronously on startup', 'Show splash screen while state hydrates']
      }
    },
    {
      id: 'app-m4',
      topicKey: 'api-integration',
      title: 'Connecting Mobile Apps to APIs',
      description: 'Master mobile HTTP networking, token refresh, and retry mechanisms.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Mobile Networking & Retry Logic',
        content: 'Mobile networking must account for spotty connections. Implement interceptors for automatic token refresh.',
        interactiveExample: {
          language: 'typescript',
          code: 'axios.interceptors.response.use(res => res, async err => { ... retry });',
          explanation: 'Axios interceptors refresh expired tokens automatically.'
        }
      },
      practice: {
        question: 'What is the best way to handle transient network errors on mobile devices?',
        options: [
          { id: 'A', text: 'Exponential backoff retry strategy with offline user feedback' },
          { id: 'B', text: 'Crash the mobile app instantly' },
          { id: 'C', text: 'Ignore errors and display blank screens' },
          { id: 'D', text: 'Prompt user to restart their phone' }
        ],
        correctAnswerId: 'A',
        explanation: 'Exponential backoff retries failed requests without overloading servers.'
      },
      review: {
        title: 'Networking Review',
        pitfalls: ['Unbounded parallel network requests overwhelming cellular data connections'],
        edgeCases: ['Captive portal Wi-Fi networks returning HTML instead of JSON'],
        keyTakeaway: 'Validate HTTP status codes and JSON parse safety.'
      },
      interview: {
        title: 'Technical Viva: Mobile Offline First',
        question: 'What is an Offline-First mobile application architecture?',
        hint: 'Write local DB first, sync with server asynchronously.',
        keyPoints: ['App writes data directly to local SQLite/watermelondb', 'Background sync queue pushes edits when online']
      }
    },
    {
      id: 'app-m5',
      topicKey: 'local-storage',
      title: 'Persisting Local App Data',
      description: 'Master fast local storage engines and relational SQLite databases on mobile.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Mobile Local Persistence',
        content: 'SQLite provides full ACID relational queries on device. MMKV provides ultra-fast key-value storage.',
        interactiveExample: {
          language: 'typescript',
          code: 'const storage = new MMKV(); storage.set("user.name", "John");',
          explanation: 'MMKV accesses memory-mapped files in native C++ for speed.'
        }
      },
      practice: {
        question: 'Where should sensitive tokens be saved on iOS devices?',
        options: [
          { id: 'A', text: 'iOS Keychain' },
          { id: 'B', text: 'Unencrypted text files' },
          { id: 'C', text: 'Public app bundle folder' },
          { id: 'D', text: 'HTML cookie storage' }
        ],
        correctAnswerId: 'A',
        explanation: 'iOS Keychain stores tokens in hardware-backed encrypted storage.'
      },
      review: {
        title: 'Local Storage Review',
        pitfalls: ['Reading large database datasets synchronously on the main thread'],
        edgeCases: ['Reaching device disk space quota limit'],
        keyTakeaway: 'Encrypt confidential user tokens; use SQLite for complex relational data.'
      },
      interview: {
        title: 'Technical Viva: Key-Value vs Relational Storage',
        question: 'Compare SQLite with MMKV for mobile storage requirements.',
        hint: 'Relational query flexibility vs fast raw key-value access.',
        keyPoints: ['SQLite supports complex SQL joins and indexing', 'MMKV provides sub-millisecond key-value lookups']
      }
    },
    {
      id: 'app-m6',
      topicKey: 'authentication',
      title: 'Authentication & Biometrics',
      description: 'Master hardware biometric integration and OAuth sign-in.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Native Biometric Auth',
        content: 'Local authentication frameworks query native biometric sensors (TouchID, FaceID, BiometricPrompt).',
        interactiveExample: {
          language: 'typescript',
          code: 'const result = await LocalAuthentication.authenticateAsync();',
          explanation: 'Prompts user for native FaceID verification.'
        }
      },
      practice: {
        question: 'Which component performs facial recognition checks on modern smartphones?',
        options: [
          { id: 'A', text: 'Hardware Secure Enclave' },
          { id: 'B', text: 'Cloud API Server' },
          { id: 'C', text: 'JavaScript runtime thread' },
          { id: 'D', text: 'Web Browser engine' }
        ],
        correctAnswerId: 'A',
        explanation: 'Dedicated secure enclaves process biometric sensor data on-device.'
      },
      review: {
        title: 'Authentication Review',
        pitfalls: ['Assuming biometrics are available without checking hardware sensor support'],
        edgeCases: ['User revoking camera or biometric permissions in OS settings'],
        keyTakeaway: 'Always fall back to passcode authentication when biometrics fail.'
      },
      interview: {
        title: 'Technical Viva: OAuth PKCE in Mobile',
        question: 'Why is Proof Key for Code Exchange (PKCE) required for mobile OAuth logins?',
        hint: 'Custom scheme interception by malicious apps.',
        keyPoints: ['Mobile apps cannot securely hide client secrets', 'PKCE generates dynamic code verifiers to prevent authorization code hijacking']
      }
    },
    {
      id: 'app-m7',
      topicKey: 'notifications',
      title: 'Push Notifications & Background Tasks',
      description: 'Master push notification payloads, FCM, and background tasks.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Push Notification Pipeline',
        content: 'Servers send payloads to FCM/APNs, which route notifications over persistent background sockets to devices.',
        interactiveExample: {
          language: 'typescript',
          code: 'messaging().onNotificationOpenedApp(remoteMessage => { ... });',
          explanation: 'Handles notification tap events when app opens from background.'
        }
      },
      practice: {
        question: 'Which services deliver push notifications to iOS and Android devices?',
        options: [
          { id: 'A', text: 'APNs and FCM' },
          { id: 'B', text: 'HTTP Polling Servers' },
          { id: 'C', text: 'Localhost WebSockets' },
          { id: 'D', text: 'DNS Records' }
        ],
        correctAnswerId: 'A',
        explanation: 'Apple Push Notification service and Firebase Cloud Messaging handle push routing.'
      },
      review: {
        title: 'Notifications Review',
        pitfalls: ['Sending heavy data payloads inside push notifications (exceeding 4KB limit)'],
        edgeCases: ['Device in Power Saving / Battery Saver mode ignoring background tasks'],
        keyTakeaway: 'Use push notifications for alerts; fetch actual data payload on app open.'
      },
      interview: {
        title: 'Technical Viva: Background Execution Limits',
        question: 'How do modern mobile operating systems restrict background app execution?',
        hint: 'Preserving battery life and device memory.',
        keyPoints: ['Mobile OS aggressive background task suspension', 'Short execution windows allocated for background sync']
      }
    },
    {
      id: 'app-m8',
      topicKey: 'mobile-project',
      title: 'Preparing an App for Release',
      description: 'Master app bundle signing, store assets, and release deployment.',
      estimatedMinutes: 60,
      lesson: {
        title: 'App Store & Play Store Publishing',
        content: 'Release builds require signing certificates (.keystore for Android, Provisioning Profiles for iOS).',
        interactiveExample: {
          language: 'bash',
          code: 'cd android && ./gradlew assembleRelease',
          explanation: 'Compiles a signed production APK/AAB bundle.'
        }
      },
      practice: {
        question: 'What is the purpose of an App Signing Certificate?',
        options: [
          { id: 'A', text: 'Verifies app developer identity and guarantees bundle integrity' },
          { id: 'B', text: 'Speed up graphics rendering' },
          { id: 'C', text: 'Encrypt user photos' },
          { id: 'D', text: 'Bypass app store submission' }
        ],
        correctAnswerId: 'A',
        explanation: 'Certificates cryptographically sign app binaries to verify publisher authenticity.'
      },
      review: {
        title: 'Release Review',
        pitfalls: ['Losing private keystore certificates needed to push future app updates'],
        edgeCases: ['App store rejection due to missing privacy policy disclosure'],
        keyTakeaway: 'Securely backup app signing keys in key management vaults.'
      },
      interview: {
        title: 'Technical Viva: App Store Review Requirements',
        question: 'What common technical checks do App Store reviewers perform?',
        hint: 'Crash on launch, broken links, required permissions disclosures.',
        keyPoints: ['Privacy permission dialog usage descriptions', 'Functioning restore purchases for IAP', 'Zero crashes on launch']
      }
    }
  ]
};
