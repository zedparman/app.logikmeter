import { store } from "../store";
import { ethers } from "ethers";
import { globalActions } from "../store/globalSlices";
import address from "../artifacts/contractAddress.json";
import abi from "../artifacts/contracts/Lock.sol/DappVotes.json";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
// import abi from "@/artifacts/contracts/DappVotes.sol/DappVotes.json";
// import { logOutWithCometChat } from "./chat";

const { setWallet, setPolls, setPoll, setContestants, setCurrentUser } =
  globalActions;
const ContractAddress = address.address;
const ContractAbi = abi.abi;
let ethereum;
let tx;

if (typeof window !== "undefined") {
  ethereum = window.ethereum;
}

const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: "eth_accounts" });
  const provider = accounts?.[0]
    ? new Web3Provider(ethereum)
    : new JsonRpcProvider("http://localhost:8085");
  const wallet = accounts?.[0] ? null : ethers.Wallet.createRandom();
  const signer = provider.getSigner(
    accounts?.[0] ? undefined : wallet?.address
  );

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
  return contract;
};

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError("Please install Metamask");
    const accounts = await ethereum.request?.({
      method: "eth_requestAccounts",
    });
    store.dispatch(setWallet(accounts?.[0]));
  } catch (error) {
    reportError(error);
  }
};

const checkWallet = async () => {
  try {
    if (!ethereum) return reportError("Please install Metamask");
    const accounts = await ethereum.request?.({ method: "eth_accounts" });

    ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    ethereum.on("accountsChanged", async () => {
      store.dispatch(setWallet(accounts?.[0]));
      await checkWallet();
      // await logOutWithCometChat();
      store.dispatch(setCurrentUser(null));
    });

    if (accounts?.length) {
      store.dispatch(setWallet(accounts[0]));
    } else {
      store.dispatch(setWallet(""));
      reportError("Please connect wallet, no accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

const createPoll = async (data) => {
  if (!ethereum) {
    reportError("Please install Metamask");
    return Promise.reject(new Error("Metamask not installed"));
  }

  try {
    const contract = await getEthereumContract();
    const { image, title, description, startsAt, endsAt } = data;
    const tx = await contract.createPoll(
      image,
      title,
      description,
      startsAt,
      endsAt
    );

    await tx.wait();
    const polls = await getPolls();
    store.dispatch(setPolls(polls));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updatePoll = async (id, data) => {
  if (!ethereum) {
    reportError("Please install Metamask");
    return Promise.reject(new Error("Metamask not installed"));
  }

  try {
    const contract = await getEthereumContract();
    const { image, title, description, startsAt, endsAt } = data;
    const tx = await contract.updatePoll(
      id,
      image,
      title,
      description,
      startsAt,
      endsAt
    );

    await tx.wait();
    const poll = await getPoll(id);
    store.dispatch(setPoll(poll));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deletePoll = async (id) => {
  if (!ethereum) {
    reportError("Please install Metamask");
    return Promise.reject(new Error("Metamask not installed"));
  }

  try {
    const contract = await getEthereumContract();
    const tx = await contract.deletePoll(id);

    await tx.wait();
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const contestPoll = async (id, name, image) => {
  if (!ethereum) {
    reportError("Please install Metamask");
    return Promise.reject(new Error("Metamask not installed"));
  }

  try {
    const contract = await getEthereumContract();
    const tx = await contract.contest(id, name, image);

    await tx.wait();
    const poll = await getPoll(id);
    store.dispatch(setPoll(poll));

    const contestants = await getContestants(id);
    store.dispatch(setContestants(contestants));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const voteCandidate = async (id, cid) => {
  if (!ethereum) {
    reportError("Please install Metamask");
    return Promise.reject(new Error("Metamask not installed"));
  }

  try {
    const contract = await getEthereumContract();
    const tx = await contract.vote(id, cid);

    await tx.wait();
    const poll = await getPoll(id);
    store.dispatch(setPoll(poll));

    const contestants = await getContestants(id);
    store.dispatch(setContestants(contestants));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const getPolls = async () => {
  const contract = await getEthereumContract();
  const polls = await contract.getPolls();
  return structurePolls(polls);
};

const getPoll = async (id) => {
  const contract = await getEthereumContract();
  const polls = await contract.getPoll(id);
  return structurePolls([polls])[0];
};

const getContestants = async (id) => {
  const contract = await getEthereumContract();
  const contestants = await contract.getContestants(id);
  return structureContestants(contestants);
};

const truncate = ({ text, startChars, endChars, maxLength }) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const structurePolls = (polls) =>
  polls
    .map((poll) => ({
      id: Number(poll.id),
      image: poll.image,
      title: poll.title,
      description: poll.description,
      votes: Number(poll.votes),
      contestants: Number(poll.contestants),
      deleted: poll.deleted,
      director: poll.director.toLowerCase(),
      startsAt: Number(poll.startsAt),
      endsAt: Number(poll.endsAt),
      timestamp: Number(poll.timestamp),
      voters: poll.voters.map((voter) => voter.toLowerCase()),
      avatars: poll.avatars,
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

const structureContestants = (contestants) =>
  contestants
    .map((contestant) => ({
      id: Number(contestant.id),
      image: contestant.image,
      name: contestant.name,
      voter: contestant.voter.toLowerCase(),
      votes: Number(contestant.votes),
      voters: contestant.voters.map((voter) => voter.toLowerCase()),
    }))
    .sort((a, b) => b.votes - a.votes);

export {
  connectWallet,
  checkWallet,
  truncate,
  formatDate,
  formatTimestamp,
  createPoll,
  updatePoll,
  deletePoll,
  getPolls,
  getPoll,
  contestPoll,
  getContestants,
  voteCandidate,
};
