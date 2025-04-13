// Simple date formatting without date-fns
export const formatCurrency = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  export const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
  
  export const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-IN', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };
  
  export const formatDateTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })} ${date.toLocaleTimeString('en-IN', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`;
    } catch (error) {
      console.error('Error formatting date and time:', error);
      return dateString;
    }
  };
  
  export const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    
    // If it already has country code
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
  };
  
  export const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };
  
  export const formatOrderStatus = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'assigned':
        return 'Assigned';
      case 'accepted':
        return 'Accepted';
      case 'picked_up':
        return 'Picked Up';
      case 'in_transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  export const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return '#FFC107'; // Amber
      case 'assigned':
        return '#2196F3'; // Blue
      case 'accepted':
        return '#03A9F4'; // Light Blue
      case 'picked_up':
        return '#9C27B0'; // Purple
      case 'in_transit':
        return '#FF9800'; // Orange
      case 'delivered':
        return '#4CAF50'; // Green
      case 'cancelled':
        return '#F44336'; // Red
      default:
        return '#757575'; // Grey
    }
  };