
import { useAppContext, useNotifications } from '../context/AppContext';

const Notification = () => {
  const { state } = useAppContext();
  const { removeNotification } = useNotifications();
  
  if (state.notifications.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {state.notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : notification.type === 'error'
              ? 'bg-red-100 border border-red-400 text-red-700'
              : notification.type === 'warning'
              ? 'bg-yellow-100 border border-yellow-400 text-yellow-700'
              : 'bg-blue-100 border border-blue-400 text-blue-700'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs opacity-75 mt-1">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close notification"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;