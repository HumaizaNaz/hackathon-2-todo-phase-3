// frontend/src/components/NotificationToast.tsx

import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificationToast({ message, type, isVisible, onClose }: NotificationToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-500/20 border-green-500/50 text-green-300',
          icon: <CheckCircle className="text-green-400" size={20} />,
        };
      case 'error':
        return {
          container: 'bg-red-500/20 border-red-500/50 text-red-300',
          icon: <X className="text-red-400" size={20} />,
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
          icon: <CheckCircle className="text-blue-400" size={20} />,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg border shadow-lg backdrop-blur-md ${styles.container}`}>
      <div className="flex items-start">
        <div className="mr-2 mt-0.5">{styles.icon}</div>
        <div className="flex-grow">{message}</div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}