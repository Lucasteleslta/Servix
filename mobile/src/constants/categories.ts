export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'electric', name: 'Elétrica', icon: '⚡' },
  { id: 'hydraulic', name: 'Hidráulica', icon: '🚰' },
  { id: 'painting', name: 'Pintura', icon: '🎨' },
  { id: 'cleaning', name: 'Limpeza', icon: '🧹' },
  { id: 'gardening', name: 'Jardinagem', icon: '🌿' },
  { id: 'renovation', name: 'Reformas', icon: '🏠' },
  { id: 'it', name: 'TI', icon: '💻' },
  { id: 'moving', name: 'Mudança', icon: '🚚' },
  { id: 'aircon', name: 'Ar-condicionado', icon: '❄️' },
  { id: 'security', name: 'Segurança', icon: '🛡️' },
];
