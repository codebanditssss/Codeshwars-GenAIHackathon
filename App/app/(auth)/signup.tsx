import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { useAuthStore } from '@/store/auth-store';
import RoleSelectionModal from '@/components/RoleSelectionModal';

// Enum for signup steps
enum SignupStep {
  INITIAL = 0,
  ROLE_SELECTION = 1,
  CUSTOMER_NAME = 2,
  CUSTOMER_ADDRESS = 3,
  CUSTOMER_CONTACT_PREF = 4,
  CUSTOMER_PAYMENT_PREF = 5,
  RIDER_NAME = 6,
  RIDER_VEHICLE = 7,
  RIDER_AVAILABILITY = 8,
  RIDER_LICENSE = 9,
  RIDER_AREA = 10,
}

export default function SignupScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  // Form state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'rider' | null>(null);
  
  // Customer specific fields
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [contactPref, setContactPref] = useState<'phone' | 'email'>('phone');
  const [paymentPref, setPaymentPref] = useState<'cash' | 'digital'>('cash');
  
  // Rider specific fields
  const [vehicleType, setVehicleType] = useState<'bike' | 'scooter'>('bike');
  const [availability, setAvailability] = useState('9 AM - 5 PM');
  const [hasLicense, setHasLicense] = useState(false);
  const [area, setArea] = useState('');
  
  // Current step in the flow
  const [currentStep, setCurrentStep] = useState<SignupStep>(SignupStep.INITIAL);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  
  // Validate phone
  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      setPhoneError('Phone number is required');
      return false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };
  
  // Validate password
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  
  // Handle next button press
  const handleNext = () => {
    if (currentStep === SignupStep.INITIAL) {
      // Validate email, phone and password
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isPasswordValid = validatePassword();
      
      if (isEmailValid && isPhoneValid && isPasswordValid) {
        setCurrentStep(SignupStep.ROLE_SELECTION);
      }
    } else if (currentStep === SignupStep.ROLE_SELECTION) {
      if (role === 'customer') {
        setCurrentStep(SignupStep.CUSTOMER_NAME);
      } else if (role === 'rider') {
        setCurrentStep(SignupStep.RIDER_NAME);
      }
    } else if (currentStep === SignupStep.CUSTOMER_NAME) {
      if (fullName.trim()) {
        setCurrentStep(SignupStep.CUSTOMER_ADDRESS);
      }
    } else if (currentStep === SignupStep.CUSTOMER_ADDRESS) {
      if (address.trim()) {
        setCurrentStep(SignupStep.CUSTOMER_CONTACT_PREF);
      }
    } else if (currentStep === SignupStep.CUSTOMER_CONTACT_PREF) {
      setCurrentStep(SignupStep.CUSTOMER_PAYMENT_PREF);
    } else if (currentStep === SignupStep.CUSTOMER_PAYMENT_PREF) {
      // Complete the customer signup
      completeSignup();
    } else if (currentStep === SignupStep.RIDER_NAME) {
      if (fullName.trim()) {
        setCurrentStep(SignupStep.RIDER_VEHICLE);
      }
    } else if (currentStep === SignupStep.RIDER_VEHICLE) {
      setCurrentStep(SignupStep.RIDER_AVAILABILITY);
    } else if (currentStep === SignupStep.RIDER_AVAILABILITY) {
      setCurrentStep(SignupStep.RIDER_LICENSE);
    } else if (currentStep === SignupStep.RIDER_LICENSE) {
      setCurrentStep(SignupStep.RIDER_AREA);
    } else if (currentStep === SignupStep.RIDER_AREA) {
      // Complete the rider signup
      completeSignup();
    }
  };
  
  // Handle back button press
  const handleBack = () => {
    if (currentStep === SignupStep.INITIAL) {
      router.back();
    } else if (currentStep === SignupStep.ROLE_SELECTION) {
      setCurrentStep(SignupStep.INITIAL);
    } else if (currentStep === SignupStep.CUSTOMER_NAME) {
      setCurrentStep(SignupStep.ROLE_SELECTION);
    } else if (currentStep === SignupStep.CUSTOMER_ADDRESS) {
      setCurrentStep(SignupStep.CUSTOMER_NAME);
    } else if (currentStep === SignupStep.CUSTOMER_CONTACT_PREF) {
      setCurrentStep(SignupStep.CUSTOMER_ADDRESS);
    } else if (currentStep === SignupStep.CUSTOMER_PAYMENT_PREF) {
      setCurrentStep(SignupStep.CUSTOMER_CONTACT_PREF);
    } else if (currentStep === SignupStep.RIDER_NAME) {
      setCurrentStep(SignupStep.ROLE_SELECTION);
    } else if (currentStep === SignupStep.RIDER_VEHICLE) {
      setCurrentStep(SignupStep.RIDER_NAME);
    } else if (currentStep === SignupStep.RIDER_AVAILABILITY) {
      setCurrentStep(SignupStep.RIDER_VEHICLE);
    } else if (currentStep === SignupStep.RIDER_LICENSE) {
      setCurrentStep(SignupStep.RIDER_AVAILABILITY);
    } else if (currentStep === SignupStep.RIDER_AREA) {
      setCurrentStep(SignupStep.RIDER_LICENSE);
    }
  };
  
  // Complete signup process
  const completeSignup = () => {
    const userData = {
      id: 'user-' + Date.now(),
      email,
      phone,
      name: fullName,
      role: role || 'customer',
      // Include other fields based on the role
      ...(role === 'customer' ? {
        address,
        landmark,
        contactPreference: contactPref,
        paymentPreference: paymentPref,
      } : {
        vehicleType,
        availability,
        hasLicense,
        area,
      }),
    };
    
    // Login the user (save to store)
    login(userData);
    
    // Navigate based on role
    if (role === 'rider') {
      router.replace('/rider/home');
    } else {
      router.replace('/(customer)/home');
    }
  };
  
  // Select role handler
  const handleRoleSelection = (selectedRole: 'customer' | 'rider') => {
    setRole(selectedRole);
  };

  // Render step title
  const getStepTitle = () => {
    switch (currentStep) {
      case SignupStep.INITIAL:
        return 'Create your account';
      case SignupStep.ROLE_SELECTION:
        return 'Select your role';
      case SignupStep.CUSTOMER_NAME:
      case SignupStep.RIDER_NAME:
        return 'What\'s your name?';
      case SignupStep.CUSTOMER_ADDRESS:
        return 'Where do you live?';
      case SignupStep.CUSTOMER_CONTACT_PREF:
        return 'How should we contact you?';
      case SignupStep.CUSTOMER_PAYMENT_PREF:
        return 'How do you prefer to pay?';
      case SignupStep.RIDER_VEHICLE:
        return 'What vehicle do you use?';
      case SignupStep.RIDER_AVAILABILITY:
        return 'When are you available?';
      case SignupStep.RIDER_LICENSE:
        return 'Do you have a valid license?';
      case SignupStep.RIDER_AREA:
        return 'What area do you operate in?';
      default:
        return 'Sign up';
    }
  };

  // Render buttons based on current step
  const renderButtons = () => {
    const isLastStep = 
      (role === 'customer' && currentStep === SignupStep.CUSTOMER_PAYMENT_PREF) ||
      (role === 'rider' && currentStep === SignupStep.RIDER_AREA);
    
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {isLastStep ? 'Complete Profile' : 'Next'}
          </Text>
          <ArrowRight size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  // Render the form content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case SignupStep.INITIAL:
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, phoneError ? styles.inputError : null]}
                placeholder="10-digit phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.passwordInput, passwordError ? styles.inputError : null]}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.text} />
                  ) : (
                    <Eye size={20} color={colors.text} />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
          </>
        );
        
      case SignupStep.ROLE_SELECTION:
        return (
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'customer' && styles.roleButtonSelected
              ]}
              onPress={() => handleRoleSelection('customer')}
            >
              <Text style={styles.roleEmoji}>🛍️</Text>
              <Text style={styles.roleTitle}>Customer</Text>
              <Text style={styles.roleDescription}>
                Order goods from local businesses
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'rider' && styles.roleButtonSelected
              ]}
              onPress={() => handleRoleSelection('rider')}
            >
              <Text style={styles.roleEmoji}>🛵</Text>
              <Text style={styles.roleTitle}>Rider</Text>
              <Text style={styles.roleDescription}>
                Deliver goods and earn money
              </Text>
            </TouchableOpacity>
          </View>
        );
        
      case SignupStep.CUSTOMER_NAME:
      case SignupStep.RIDER_NAME:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder={currentStep === SignupStep.CUSTOMER_NAME ? 
                "e.g., Anil Sharma" : "e.g., Ravi Kumar"}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        );
        
      case SignupStep.CUSTOMER_ADDRESS:
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 123 Main St"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Landmark (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Near Shiv Temple"
                value={landmark}
                onChangeText={setLandmark}
              />
            </View>
          </>
        );
        
      case SignupStep.CUSTOMER_CONTACT_PREF:
        return (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                contactPref === 'phone' && styles.optionButtonSelected
              ]}
              onPress={() => setContactPref('phone')}
            >
              <Text style={styles.optionEmoji}>📱</Text>
              <Text style={styles.optionTitle}>Phone</Text>
              <Text style={styles.optionDescription}>
                Receive notifications via SMS
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                contactPref === 'email' && styles.optionButtonSelected
              ]}
              onPress={() => setContactPref('email')}
            >
              <Text style={styles.optionEmoji}>✉️</Text>
              <Text style={styles.optionTitle}>Email</Text>
              <Text style={styles.optionDescription}>
                Receive notifications via email
              </Text>
            </TouchableOpacity>
          </View>
        );
        
      case SignupStep.CUSTOMER_PAYMENT_PREF:
        return (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                paymentPref === 'cash' && styles.optionButtonSelected
              ]}
              onPress={() => setPaymentPref('cash')}
            >
              <Text style={styles.optionEmoji}>💵</Text>
              <Text style={styles.optionTitle}>Cash on Delivery</Text>
              <Text style={styles.optionDescription}>
                Pay when your order arrives
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                paymentPref === 'digital' && styles.optionButtonSelected
              ]}
              onPress={() => setPaymentPref('digital')}
            >
              <Text style={styles.optionEmoji}>💳</Text>
              <Text style={styles.optionTitle}>Digital Payment</Text>
              <Text style={styles.optionDescription}>
                Pay online when ordering
              </Text>
            </TouchableOpacity>
          </View>
        );
        
      case SignupStep.RIDER_VEHICLE:
        return (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                vehicleType === 'bike' && styles.optionButtonSelected
              ]}
              onPress={() => setVehicleType('bike')}
            >
              <Text style={styles.optionEmoji}>🚲</Text>
              <Text style={styles.optionTitle}>Bike</Text>
              <Text style={styles.optionDescription}>
                For small, quick deliveries
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.optionButton,
                vehicleType === 'scooter' && styles.optionButtonSelected
              ]}
              onPress={() => setVehicleType('scooter')}
            >
              <Text style={styles.optionEmoji}>🛵</Text>
              <Text style={styles.optionTitle}>Scooter</Text>
              <Text style={styles.optionDescription}>
                For larger or multiple deliveries
              </Text>
            </TouchableOpacity>
          </View>
        );
        
      case SignupStep.RIDER_AVAILABILITY:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>When are you available?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 9 AM - 5 PM"
              value={availability}
              onChangeText={setAvailability}
            />
          </View>
        );
        
      case SignupStep.RIDER_LICENSE:
        return (
          <View style={styles.licenseContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setHasLicense(!hasLicense)}
            >
              <View style={[
                styles.checkbox,
                hasLicense && styles.checkboxChecked
              ]}>
                {hasLicense && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                I confirm I have a valid driving license
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.licenseNote}>
              Note: You may be asked to verify your license before starting deliveries
            </Text>
          </View>
        );
        
      case SignupStep.RIDER_AREA:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>What area do you operate in?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Patna, Bihar"
              value={area}
              onChangeText={setArea}
            />
          </View>
        );
        
      default:
        return null;
    }
  };

  // Render back button if not on the first step
  const renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
      >
        <ChevronLeft size={24} color={colors.text} />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {currentStep > SignupStep.INITIAL && renderBackButton()}
          <Text style={styles.title}>{getStepTitle()}</Text>
        </View>
        
        <View style={styles.formContainer}>
          {renderStepContent()}
        </View>
        
        {renderButtons()}
        
        {currentStep === SignupStep.INITIAL && (
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
    flex: 1,
    textAlign: 'center',
    marginRight: 24, // To offset the back button width
  },
  backButton: {
    padding: 5,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.textDark,
    fontWeight: '500',
  },
  input: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.textDark,
  },
  inputError: {
    borderColor: colors.error,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.textDark,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  nextButton: {
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    fontSize: 15,
    color: colors.text,
  },
  signInLink: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  roleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  roleButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },
  roleButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  roleEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  optionButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  optionEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  licenseContainer: {
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.textDark,
    flex: 1,
  },
  licenseNote: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    marginTop: 10,
  },
});