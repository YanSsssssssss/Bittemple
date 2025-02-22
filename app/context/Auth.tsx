import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义 Context 的类型
type AuthContextType = {
  walletAddress: string;
  connectWallet: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// 定义 Provider 组件的 Props 类型
type AuthProviderProps = {
  children: ReactNode;
};

// 创建 Provider 组件
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 状态：存储钱包地址
  const [walletAddress, setWalletAddress] = useState<string>('');
  console.log('😩')
  // 连接钱包函数
  const connectWallet = async () => {
    console.log('😩')
    // 检查是否安装了 MetaMask
    if (typeof window.ethereum === 'undefined') {
        alert('请先安装 MetaMask 插件，请安装后刷新页面，并确保 MetaMask 已连接到本地链');
        return;
    }

    try {
      // 请求用户授权
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts'
      }) as string[]; // 告诉 TypeScript 返回的是字符串数组
      console.log(accounts)
      // 更新状态并保存到本地存储
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    } catch (error) {
      console.error('连接失败:', error);
    }
  };

  // 初始化时检查本地存储
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  // 提供 Context 值
  const value = {
    walletAddress,
    connectWallet,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，方便在组件中使用 Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内使用');
  }
  return context;
};