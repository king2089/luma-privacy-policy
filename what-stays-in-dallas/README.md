# What Stays In Dallas

A social media app for sharing and discovering the best moments in Dallas, Texas. Built with React Native and Expo for iOS and Android.

## 🌟 Features

- **User Authentication**: Login and registration system
- **Feed**: Browse posts from other Dallas locals
- **Create Posts**: Share photos with captions and location tags
- **Search & Explore**: Discover content by hashtags and locations
- **User Profiles**: Personalized profiles with post history
- **Activity Feed**: See likes, comments, and follows
- **Dallas-Themed UI**: Custom design with Dallas Cowboys orange (#FF6B35)

## 🏗️ Tech Stack

- **React Native** with TypeScript
- **Expo** for cross-platform development
- **React Navigation** for navigation
- **Context API** for state management
- **AsyncStorage** for local data persistence
- **Expo Image Picker** for photo uploads
- **Expo Camera** for taking photos

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd what-stays-in-dallas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Use Expo Go app to scan the QR code and run the app on your device

### Running on Specific Platforms

```bash
# iOS (requires macOS)
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   └── PostCard.tsx    # Post display component
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── PostContext.tsx # Posts and comments state
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/           # App screens
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── CreatePostScreen.tsx
│   ├── ActivityScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PostDetailScreen.tsx
│   └── EditProfileScreen.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── context/           # Global state management
```

## 🎨 Design Theme

The app uses a Dallas-inspired color scheme:

- **Primary Orange**: #FF6B35 (Dallas Cowboys orange)
- **Dark Blue**: #2E4A62 (Dallas night sky)
- **Light Gray**: #F5F5F5 (Background)
- **White**: #FFFFFF (Cards and inputs)

## 🔧 Key Features Implementation

### Authentication
- Mock authentication system with demo credentials
- User registration with username and email
- Profile management with bio and avatar
- Persistent login state with AsyncStorage

### Posts
- Create posts with text, images, and location
- Like and comment functionality
- Hashtag support for discovery
- Image picker integration for photos

### Navigation
- Bottom tab navigation for main screens
- Stack navigation for detail screens
- Dallas-themed tab bar with custom icons

### Search & Discovery
- Hashtag-based search
- Trending Dallas hashtags
- Category-based exploration
- Real-time search filtering

## 📄 Demo Credentials

For testing the app, use these demo credentials:

- **Email**: user@example.com
- **Password**: password

## 🚀 Deployment

### Build for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Create production build
expo build
```

### Publishing to Expo

```bash
expo publish
```

## 🎯 Future Enhancements

- Real backend API integration
- Push notifications
- Direct messaging
- Story features
- Advanced photo filters
- Geolocation-based discovery
- Social features (follow/unfollow)
- Real-time chat

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📱 Screenshots

The app features a modern, Dallas-themed design with:
- Clean, minimalist interface
- Orange accent colors
- Intuitive navigation
- Professional typography
- Responsive layouts

## 🔐 Privacy & Security

- Local data storage only (no external servers)
- Mock authentication for demo purposes
- No real user data collection
- Images stored locally on device

## 📞 Support

For support or questions about the app, please open an issue in the repository.

---

**Made with ❤️ for Dallas** 🤠