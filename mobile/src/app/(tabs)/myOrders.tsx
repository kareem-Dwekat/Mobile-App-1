import React, { useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import OrdersHeader from '../../components/myOrdersComponents/OrdersHeader';
import OrdersTabs from '../../components/myOrdersComponents/OrdersTabs';
import OrderCard from '../../components/myOrdersComponents/OrderCard';

type OrderStatus = 'Pending' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

const ordersData: Order[] = [
  { id: '0050', date: '07 Feb 2026', items: 1, amount: 120, status: 'Delivered' },
  { id: '0051', date: '07 Feb 2026', items: 1, amount: 627.98, status: 'Pending' },
  { id: '0052', date: '07 Feb 2026', items: 1, amount: 90, status: 'Pending' },
  { id: '0053', date: '07 Feb 2026', items: 1, amount: 150, status: 'Pending' },
  { id: '0054', date: '07 Feb 2026', items: 2, amount: 300, status: 'Pending' },
  { id: '0055', date: '07 Feb 2026', items: 1, amount: 80, status: 'Cancelled' },

];

type FilterTab = 'All Orders' | 'Pending Orders' | 'Completed Orders' | 'Cancelled Orders';

interface TabConfig {
  key: FilterTab;
  label: string;
  count: number;
}

const tabs: TabConfig[] = [
  { key: 'All Orders', label: 'All', count: ordersData.length },
  { key: 'Pending Orders', label: 'Pending', count: ordersData.filter(o => o.status === 'Pending').length },
  { key: 'Completed Orders', label: 'Complete', count: ordersData.filter(o => o.status === 'Delivered').length },
  { key: 'Cancelled Orders', label: 'Cancel', count: ordersData.filter(o => o.status === 'Cancelled').length },
];

const MyOrdersScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = ordersData.filter(order => {
    if (activeTab === 'All Orders') return true;
    if (activeTab === 'Pending Orders') return order.status === 'Pending';
    if (activeTab === 'Completed Orders') return order.status === 'Delivered';
    if (activeTab === 'Cancelled Orders') return order.status === 'Cancelled';
    return false;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <OrdersHeader onBack={() => navigation.goBack()} />

      <OrdersTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            isExpanded={expandedOrderId === item.id}
            onPress={() =>
              setExpandedOrderId(prev =>
                prev === item.id ? null : item.id
              )
            }
          />
        )}
      />

    </SafeAreaView>
  );
};

export default MyOrdersScreen;