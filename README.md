# Minटों

A modern mobile application built with React Native and Expo that connects customers with local delivery services, offering fast and reliable deliveries with the tagline "Your needs, Our speed".

![App Screenshot](App/assets/images/GHAR\ \(1\).png)

## Features

### For Customers
- Quick and seamless ordering experience
- Real-time order tracking
- Multiple delivery options
- Order history and reordering
- User profiles and saved addresses

### For Delivery Partners
- Real-time availability toggle
- Order pickup and delivery navigation
- Earnings tracking and statistics
- Profile management
- Delivery history

### For Businesses
- Order management dashboard
- Inventory control
- Real-time delivery tracking
- Analytics and reporting
- Customer engagement tools

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: Expo Router
- **State Management**: Custom store implementation with Zustand
- **UI Components**: Custom React Native components
- **Maps & Location**: React Native Maps
- **Authentication**: Custom auth implementation

## Project Structure

- `App/` - Main application directory
  - `app/` - Contains all screens and routes using Expo Router
    - `(tabs)/` - Main tab navigation screens (home, earnings, orders, analytics, account)
    - `(auth)/` - Authentication related screens (login, signup, welcome)
    - `(customer)/` - Customer-facing screens
    - `admin/` - Admin panel screens
    - `rider/` - Rider-specific screens
    - `order/` - Order management screens
    - `vendor/` - Vendor-specific screens
    - `business/` - Business management screens
  - `assets/` - Static assets like images and fonts
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
git clone https://github.com/codebanditssss/Codeshwars-GenAIHackathon.git
```

2. Install dependencies
```bash
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
- API endpoints
- Map API keys
- Other secret keys

## Known Issues

- Maximum update depth exceeded error in WelcomeScreen component
- Missing route "business" in the nested children

## Development Roadmap

- [ ] Fix navigation issues
- [ ] Complete order management flow
- [ ] Improve UI/UX for customer screens
- [ ] Implement payment integrations
- [ ] Add push notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Team

- Team Codeshvars - Codeshvars GenAI Hackathon

## License

This project is licensed under the MIT License - see the LICENSE file for details. 