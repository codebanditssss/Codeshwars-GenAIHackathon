# ConnectSphere

A comprehensive mobile application built with React Native and Expo that connects riders with local businesses for fast and reliable delivery services.

## Features

### For Riders
- Real-time availability toggle
- Order tracking and management
- Points system and achievement badges
- Interactive map view for navigation
- Order history and status updates

### For Businesses
- Order creation and management
- Dashboard with order statistics
- Track deliveries in real-time
- Order history and analytics

## Tech Stack

- **Frontend**: React Native, Expo Router
- **UI Components**: Custom React Native components
- **Authentication**: Clerk
- **State Management**: Custom store implementation
- **Navigation**: Expo Router

## Project Structure

- `App/` - Main application directory
  - `app/` - Contains all screens and routes using Expo Router
    - `(tabs)/` - Main tab navigation screens
    - `(auth)/` - Authentication related screens
    - `(customer)/` - Customer-facing screens
    - `admin/` - Admin panel screens
    - `rider/` - Rider-specific screens
    - `order/` - Order management screens
    - `vendor/` - Vendor-specific screens
    - `business/` - Business management screens
  - `components/` - Reusable UI components
  - `constants/` - Application constants and theme settings
  - `store/` - State management
  - `types/` - TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
cd App
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on device or emulator
```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
- Required environment variables as specified in your .env file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 