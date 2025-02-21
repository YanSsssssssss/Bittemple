import { ethers } from "ethers";

export interface MsgStruct {
    text: string,
    address: string,
    nickname: string,
    time: number,
}

// Sepolia 网络 RPC URL（你也可以使用 Infura 或 Alchemy 等服务）
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/CgIS8gBoKOp3atEMXs4ZhEwuJVdFiAU0");

const privateKey = "70a45ebde804808ea770145bd1758f1d7649449a5b3a9cb72dcb23930e6afb3c";  // 请确保你在代码中正确保管私钥
const wallet = new ethers.Wallet(privateKey, provider);

// 合约地址和 ABI
const contractAddress = "0x9AB674C725cD95E2211191B297cc54f94089BfA1";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "text",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "NewMsgSubmit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			}
		],
		"name": "submit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "msgCount",
				"type": "uint16"
			}
		],
		"name": "getMsgList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nickname",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct MsgBoard.Message[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Messages",
		"outputs": [
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// 创建合约实例
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// 调用合约方法（例如调用 `getMsgList` 获取消息）
export async function getMessages():Promise<MsgStruct[]> {
  try {
    const messages = await contract.getMsgList(1);

	return messages.map((msg: any) => ({
		text: msg[0],
		address: msg[1],
		nickname: msg[2],
		time: Number(msg[3])
	}));
  } catch (error) {
    console.error("Error:", error);
	return []
  }
}

// 调用提交消息的函数
export async function submitMessage(text: string, nickname: string) {
  try {
    const tx = await contract.submit(text, nickname);
    await tx.wait();  // 等待交易确认
    console.log("Message submitted successfully:", tx);
  } catch (error) {
    console.error("Error:", error);
  }
}

// getMessages();  // 获取消息示例
// submitMessage("Hello, Sepolia!", "User1");  // 提交消息示例

