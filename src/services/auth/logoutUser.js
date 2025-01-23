import { Session } from '../../models/session.js';

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};