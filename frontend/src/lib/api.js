import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

export const createRsvp = (data) => client.post("/rsvp", data).then((r) => r.data);
export const getRsvpStats = () => client.get("/rsvp/stats").then((r) => r.data);
export const createWish = (data) => client.post("/wishes", data).then((r) => r.data);
export const getWishes = () => client.get("/wishes").then((r) => r.data);
