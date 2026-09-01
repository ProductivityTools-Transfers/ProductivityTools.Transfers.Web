import axios from "axios";
import { config } from "../Config";
import Account from "../Objects/Account";
import Transfer from "../Objects/Transfer";
import { auth } from "../Session/firebase";

async function echo() {
  const response = await axios.get(`${config.pathBase}/Transfer/echo?name=pawel`);
  return response.data;
}

// async function getTransfers(item: number | null) {
//   const data = { transferId: item };
//   const response = await axios.post(`${config.pathBase}/Transfer/TransferList`, data);
//   return response.data;
// }

async function getAuthHeader() {
  if (auth.authStateReady) {
    await auth.authStateReady();
  }
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    return {
      headers: { Authorization: `Bearer ${idToken}` },
    };
  }
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  return undefined;
}

async function callAuthorizedEndpoint(call: any) {
  const header = await getAuthHeader();
  if (header) {
    try {
      const result = await call(header);
      return result;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("User not authenticated");
  }
}

async function getTransfers(item: number | null) {
  let call = async (header: any) => {
    const data = { transferId: item };
    const response = await axios.post(`${config.pathBase}/Transfer/TransferList`, data, header);
    return response.data;
  };
  return callAuthorizedEndpoint(call);
}

async function getTransfer(item: number) {
  let call = async (header: any) => {
    const data = { transferId: item };
    const response = await axios.post(`${config.pathBase}/Transfer/TransferItem`, data, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

async function addTransfer(transfer: Transfer) {
  let call = async (header: any) => {
    const response = await axios.post(`${config.pathBase}/Transfer/TransferEdit`, transfer, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

async function transferDelete(item: number) {
  let call = async (header: any) => {
    const data = { transferId: item };
    const response = await axios.post(`${config.pathBase}/Transfer/TransferDelete`, data, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

async function getAccounts() {
  const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/AccountList`, data);
  return response.data;
}

async function getAccount(item: number) {
  let call = async (header: any) => {
    const data = { accountId: item };

    const response = await axios.post(`${config.pathBase}/Account/AccountItem`, data, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

async function addAccount(account: Account) {
  //const data = { Name: "Proxy" };
  const response = await axios.post(`${config.pathBase}/Account/AccountEdit`, account);
  return response.data;
}

async function getTransfersHistory() {
  let call = async (header: any) => {
    const response = await axios.post(`${config.pathBase}/TransferHistory/List`, {}, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

async function addTransferHistorySnapshot() {
  let call = async (header: any) => {
    const response = await axios.post(`${config.pathBase}/TransferHistory/AddSnapshot`, {}, header);
    return response.data;
  }
  return callAuthorizedEndpoint(call);
}

export { getTransfers, getTransfer, addTransfer, transferDelete, getAccounts, getAccount, addAccount, getTransfersHistory, addTransferHistorySnapshot, echo };
