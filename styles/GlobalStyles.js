import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  
  // Header styles
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  
  // Cart item styles
  cartItem: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  
  productInfo: {
    flex: 1,
  },
  
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 10,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 10,
  },
  
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 15,
  },
  
  deleteButton: {
    padding: 10,
  },
  
  // Summary styles
  summaryContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  
  // Button styles
  proceedButton: {
    backgroundColor: '#FF6B35',
    margin: 10,
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
  },
  
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Status bar colors
  statusBarBatteryGreen: '#28a745', // Green for battery
  statusBarWifiBlue: '#007AFF', // Blue for WiFi
  statusBarBluetoothBlue: '#007AFF', // Blue for bluetooth
  statusBarInternetGreen: '#28a745', // Green for internet
  
  // New colors from user request
  headerBackground: '#fff',
  proceedButtonColor: '#4169E1', // Blue for charging
  shippingColor: '#28a745', // Green for shipping
  bluetoothColor: '#007AFF', // Blue for bluetooth
  topSectionBackground: '#f8f9fa', // Light background for top section
  
  // Bottom navigation styles
  bottomNav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
  
  activeNavLabel: {
    color: '#FF6B35',
  },
  activeNavIcon: {
    color: '#FF6B35',
  },

  // Wishlist styles
  wishlistHeader: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  backButton: {
    padding: 5,
  },

  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },

  wishlistHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },

  headerPlaceholder: {
    width: 30,
  },

  wishlistItem: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },

  checkboxCheck: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  wishlistImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },

  wishlistInfo: {
    flex: 1,
  },

  wishlistName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  wishlistCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },

  wishlistPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  wishlistQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },

  wishlistQuantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  wishlistQuantityButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },

  wishlistQuantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 12,
  },

  wishlistFooter: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  selectAllText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },

  addToCartButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});